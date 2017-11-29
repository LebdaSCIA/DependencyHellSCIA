#pragma once

#include "Commons.h"

class CReduceDependencies final
{
public:
	void ModifyDependenciesWithTransientFlags(vector<link>& links);

protected:
	void CreateMapAllDlls(const vector<link>& links);
	info_dll GetDependenciesForTarget(short target, const vector<link>& links);

	void FindAllTransient();
	void AddAllLevelsDependencies(short idTarget, setOfIDs& all);

private:
	map<short, info_dll> m_mapAllDlls;
};
