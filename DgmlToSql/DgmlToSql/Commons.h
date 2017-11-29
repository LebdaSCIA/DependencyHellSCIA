#pragma once


enum class eCategory
{
	eUnknown = 1,
	eKernel,
	eDataModel,
	eChecks,
	eGUI,
	eUT,
	eCommands,
	eNexis,
	eAlgorithms,
	eStorage
};

struct project
{
	int id = 0;
	int LoC = 0;
	eCategory category = eCategory::eUnknown;
	wstring name;
	wstring path;
	wstring comment;
};

struct link
{
	int id = 0;
	short target = 0;
	short source = 0;
	bool isTransient = false;
};

using vecOfIDs = vector<short>;
using setOfIDs = set<short>;

struct info_dll
{
	short id;
	vecOfIDs dep;
	vecOfIDs transient;
	unique_ptr<setOfIDs> all;
};
