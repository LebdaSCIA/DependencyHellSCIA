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
	eNexis
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

struct linked_id_with_flag
{
	linked_id_with_flag(short id, bool b) : linked_id(id), transient(b) {}
	short linked_id = 0;
	bool transient = false;
};

using vecLinkswF = vector<linked_id_with_flag>;
using mapTargetToLinkswF = map<short, vecLinkswF>;

