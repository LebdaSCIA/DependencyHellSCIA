#include "stdafx.h"
#include "ReduceDependencies.h"

// example:
// 19 - EP_Environment
// 20 - RootAppBase
// link: dllSourceID = 19, dllTargetID = 20
// meaning is: 'target' is dependent on 'source'

void CReduceDependencies::ModifyDependenciesWithFlags(vector<link>& links)
{
	mapTargetToLinkswF mapTargets = GetMapTargetToLinks(links);
	for (auto& one : mapTargets)
	{
		short targetId = one.first;
		cout << targetId << " - start\r\n";
		auto& vecLinkswFlags = one.second;
		for (auto& oneLinkwFlag : vecLinkswFlags)
		{
			if (IsLinkedId(oneLinkwFlag.linked_id, FilterDepFlags(oneLinkwFlag.linked_id, vecLinkswFlags), mapTargets))
			{
				oneLinkwFlag.transient = true;
				auto itf = find_if(links.begin(), links.end(), [=](link& ln) { return ln.target == targetId && ln.source == oneLinkwFlag.linked_id; });
				if (itf != links.cend())
				{
					itf->isTransient = true;
				}
			}
		}
	}
}

vecLinkswF CReduceDependencies::GetDependenciesForTarget(short target, const vector<link>& links)
{
	vecLinkswF flags;
	flags.reserve(200U);
	for (const auto& one : links)
	{
		if (one.target == target)
		{
			flags.push_back(linked_id_with_flag{ one.source, false });
		}
	}
	flags.shrink_to_fit();
	return flags;
}

mapTargetToLinkswF CReduceDependencies::GetMapTargetToLinks(const vector<link>& links)
{
	mapTargetToLinkswF mapTargets;
	for (const auto& one : links)
	{
		if (mapTargets.find(one.target) == mapTargets.cend())
		{
			mapTargets[one.target] = GetDependenciesForTarget(one.target, links);
			cout << one.target << "; dep = " << mapTargets[one.target].size() << "\r\n";
		}
	}
	return mapTargets;
}

vecLinkswF CReduceDependencies::FilterDepFlags(short id, vecLinkswF v)
{
	v.erase(remove_if(v.begin(), v.end(), [id](const linked_id_with_flag& i) { return i.linked_id == id; }), v.end());
	return v;
};

bool CReduceDependencies::IsLinkedId(short id, const vecLinkswF& dependLinksActualLevel, const mapTargetToLinkswF& mapTargets)
{
	for (auto& i : dependLinksActualLevel)
	{
		if (i.linked_id == id)
		{
			return true;
		}
	}
	for (const auto& oneLink : dependLinksActualLevel)
	{
		auto itf2 = mapTargets.find(oneLink.linked_id);
		if (itf2 != mapTargets.cend())
		{
			if (IsLinkedId(id, itf2->second, mapTargets))
			{
				return true;
			}
		}
	}
	return false;
}
