// DgmlToSql.cpp : Defines the entry point for the console application.
//

#include "stdafx.h"
#include <windows.h>
#include <tchar.h>
#include <stdio.h>
#include "Commons.h"
#include "ReduceDependencies.h"

// static wstring GetWideString(string str)
// {
// 	wstring_convert<codecvt_utf8_utf16<wchar_t>> converter;
// 	wstring wide = converter.from_bytes(str);
// 	return wide;
// }
// 
// static string GetNarrowString(wstring str)
// {
// 	wstring_convert<codecvt_utf8_utf16<wchar_t>> converter;
// 	string narrow = converter.to_bytes(str);
// 	return narrow;
// }


// templated version of my_equal so it could work with both char and wchar_t
template<typename charT>
struct my_equal {
	my_equal(const std::locale& loc) : loc_(loc) {}
	bool operator()(charT ch1, charT ch2) {
		return std::toupper(ch1, loc_) == std::toupper(ch2, loc_);
	}
private:
	const std::locale& loc_;
};

// find substring (case insensitive)
int ci_find_substr(const wstring& str1, const wstring& str2, const std::locale& loc = std::locale())
{
	auto it = std::search(str1.begin(), str1.end(), str2.begin(), str2.end(), my_equal<typename wstring::value_type>(loc));
	if (it != str1.end()) return it - str1.begin();
	else return -1; // not found
}

bool is_substr(const wstring& str1, const wstring& str2)
{
	return ci_find_substr(str1, str2) != -1;
}

int GetID(const wstring& item)
{
	size_t pos1 = item.find('@');
	size_t pos2 = item.find(')');
	auto n = item.substr(pos1 + 1, pos2 - pos1 - 1);
	return stoi(n);
}

inline wstring ParseLabel(const wstring& line)
{
	size_t pos1 = line.find('"');
	size_t pos2 = line.find('.', pos1 + 2);
	if (pos2 == string::npos)
	{
		pos2 = line.rfind('"');
	}
	return line.substr(pos1 + 1, pos2 - pos1 - 1);
}

inline wstring ParsePath(const wstring& line)
{
	size_t pos1 = line.find('"');
	size_t pos2 = line.rfind('"');
	return line.substr(pos1 + 1, pos2 - pos1 - 1);
}

struct substrToCategory
{
	substrToCategory(wstring s, eCategory c) : substr(s), ctg(c) {}
	wstring substr;
	eCategory ctg;
};
eCategory GetCategory(const project& oneDLL)
{
	static const vector<substrToCategory> vec =
	{
		{ L"r:\\" , eCategory::eNexis }
		,{ L"cmds" , eCategory::eCommands }
		,{ L"ut" , eCategory::eUT }
		,{ L"test" , eCategory::eUT }
		,{ L"result" , eCategory::eChecks }
		,{ L"check" , eCategory::eChecks }
		,{ L"nexis" , eCategory::eNexis }
		,{ L"cross" , eCategory::eDataModel }
		,{ L"css" , eCategory::eDataModel }
		,{ L"data" , eCategory::eDataModel }
		,{ L"lib" , eCategory::eDataModel }
		// folders must be lats
		,{ L"\\lat" , eCategory::eGUI }
		,{ L"\\mic" , eCategory::eKernel }
		,{ L"\\lok" , eCategory::eGUI }
		,{ L"\\tra" , eCategory::eKernel }
	};
	auto itf = find_if(vec.cbegin(), vec.cend(), [oneDLL](const substrToCategory& i) { return is_substr(oneDLL.path, i.substr); });
	if (itf != vec.cend())
	{
		return itf->ctg;
	}
	return eCategory::eUnknown;
}

int GetLoC(const wstring& sourceCodeBase, const project& oneDLL)
{
	size_t pos1 = oneDLL.path.rfind('\\');
	wstring path = sourceCodeBase + oneDLL.path.substr(0U, pos1);
	vector<wstring> allFiles;
	HANDLE dir;
	WIN32_FIND_DATA file_data;

	if ((dir = FindFirstFile((path + L"\\*").c_str(), &file_data)) == INVALID_HANDLE_VALUE)
	{
		return 0; // No files found
	}
	
	do {
		const wstring file_name = file_data.cFileName;
		const wstring full_file_name = path + L"/" + file_name;
		const bool is_directory = (file_data.dwFileAttributes & FILE_ATTRIBUTE_DIRECTORY) != 0;
		if (file_name[0] == '.') { continue; }
		if (is_directory) { continue; }
		allFiles.push_back(full_file_name);
	} while (FindNextFile(dir, &file_data));
	FindClose(dir);

	int LoC = 0;
	for (const auto& f : allFiles)
	{
		if ((-1 != ci_find_substr(f, L".cpp"))
			|| (-1 != ci_find_substr(f, L".h"))
			|| (-1 != ci_find_substr(f, L".idl")))
		{
			wfstream instream(f, ios::in | ios::binary);
			wstring line;
			while (getline(instream, line))
			{
				++LoC;
			}
		}
	}
	return LoC;
}

vector<project> ReadDlls(const wstring& sourceCodeBase, wfstream& instream)
{
	auto startTime = chrono::steady_clock::now();

	vector<project> projects;
	projects.reserve(750U);
	wstring line;
	project oneDLL;
	while (getline(instream, line))
	{
		if (line.find(L"Label") != string::npos)
		{
			oneDLL.name = ParseLabel(line);
			continue;
		}
		if (line.find(L"FilePath") != string::npos)
		{
			oneDLL.path = ParsePath(line);
			continue;
		}
		if (line.find(L"Id") != string::npos)
		{
			oneDLL.id = GetID(line);
			oneDLL.category = GetCategory(oneDLL);
			oneDLL.LoC = GetLoC(sourceCodeBase, oneDLL);
			projects.push_back(oneDLL);
			wcout << oneDLL.id << L": ";
			wcout << oneDLL.name << L"; LoC = " << oneDLL.LoC << L"\r\n";
			continue;
		}
		if (line.find(L"<Links>") != string::npos)
		{
			break;
		}
	}

	chrono::duration<double> diff = chrono::steady_clock::now() - startTime;
	double seconds = diff.count();
	cout << "\nFinished reading Dlls (seconds): " << seconds << "\r\n";
	cout << "Count of projects in 'dgml' file: " << projects.size() << "\r\n";

	return projects;
}

vector<link> ReadLinks(wfstream& instream)
{
	auto startTime = chrono::steady_clock::now();

	vector<link> links;
	links.reserve(30000U);
	wstring line;
	link oneLink;
	while (getline(instream, line))
	{
		if (line.find(L"Target") != string::npos)
		{
			oneLink.target = static_cast<short>(GetID(line));
			getline(instream, line);
			oneLink.source = static_cast<short>(GetID(line));
			++oneLink.id;
			links.push_back(oneLink);
		}
	}

	chrono::duration<double> diff = chrono::steady_clock::now() - startTime;
	double seconds = diff.count();
	cout << "\nFinished reading links (seconds): " << seconds << "\r\n";
	cout << "Count of links in 'dgml' file: " << links.size() << "\r\n";

	return links;
}

void WriteOutputSciaDlls(const string& fileName, const vector<project>& projects)
{
	wfstream outstream1(fileName, ios::out | ios::binary);
	outstream1 << "INSERT dbo.SCIADLL(ID, Name, Path, Category, Status, Comment, LoC) VALUES\r\n";
	for (const auto& p : projects)
	{
		outstream1 << L" (" << p.id << L", '" << p.name << L"', '" << p.path << "', ";
		outstream1 << static_cast<int>(p.category) << L", 1, NULL, " << p.LoC << L"),\r\n";
	}
	outstream1 << "GO\r\n";
	outstream1.close();
	cout << "\n Saving list of all Dlls into a file: " << fileName << "\r\n";
}

void WriteOutputLinks(const string& fileName, const vector<link>& links)
{
	wstring dependHeader = L"INSERT dbo.DllDependency (ID, dllSourceID, dllTargetID, isTransient) VALUES\r\n";
	wfstream outstream2(fileName, ios::out | ios::binary);
	outstream2 << dependHeader;
	int counter = 1;
	for (const auto& s : links)
	{
		if ((counter % 1000) == 0)
		{
			counter = 1;
			outstream2 << L"\r\nGO\r\n" << dependHeader;
		}
		outstream2 << L" (" << s.id << L", " << s.source << L", " << s.target << L", " << s.isTransient << L")";
		++counter;
		if ((counter % 1000) != 0)
		{
			outstream2 << L",\r\n";
		}
	}
	outstream2 << L"GO\r\n";
	outstream2.close();
	cout << "\n Saving all links between Dlls into a file: " << fileName << "\r\n";
}

int main(int argc, char *argv[], char *envp[])
{
	(envp);
	if (argc != 2) { return 1; }

	auto fileName = string(argv[1]);
	wfstream instream(fileName, ios::in | ios::binary);
	auto sourceCodeBase = wstring(L"c:\\Deve\\D64\\A\\Src\\ADMIN\\");

	auto projects = ReadDlls(sourceCodeBase, instream);
	auto links = ReadLinks(instream);

  	CReduceDependencies reduce;
  	reduce.ModifyDependenciesWithTransientFlags(links);

	WriteOutputSciaDlls("c:\\Deve\\SCIADllInfo.txt", projects);
	WriteOutputLinks("c:\\Deve\\SCIADllLinks.txt", links);

	size_t countTransient = 0U;
	for (auto& li : links)
	{
		if (li.isTransient) { ++countTransient; }
	}

	cout << endl;
	return 0;
}
