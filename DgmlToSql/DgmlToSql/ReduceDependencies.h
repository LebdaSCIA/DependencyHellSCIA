#pragma once

#include "Commons.h"

class CReduceDependencies final
{
public:
	void ModifyDependenciesWithFlags(vector<link>& links);

protected:
	info_dll GetDependenciesForTarget(short target, const vector<link>& links);
	mapTargetToLinkswF GetMapTargetToLinks(const vector<link>& links);
	vecLinkswF FilterDepFlags(short id, vecLinkswF v);
	bool IsLinkedId(short id, const vecLinkswF& dependLinksActualLevel, const mapTargetToLinkswF& mapTargets);
};
