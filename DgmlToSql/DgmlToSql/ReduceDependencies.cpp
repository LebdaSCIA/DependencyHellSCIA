#include "stdafx.h"
#include "ReduceDependencies.h"

// example:
// 19 - EP_Environment
// 20 - RootAppBase
// link: dllSourceID = 19, dllTargetID = 20
// meaning is: 'target' is dependent on 'source'

void CReduceDependencies::ModifyDependenciesWithTransientFlags(vector<link>& links)
{
	CreateMapAllDlls(links);
	FindAllTransient();
	for (link& li : links)
	{
		auto itf = m_mapAllDlls.find(li.target);
		auto& oneDll = itf->second;
		for (short idTransient : oneDll.transient)
		{
			if (li.source == idTransient)
			{
				li.isTransient = true;
				break;
			}
		}
	}
}

info_dll CReduceDependencies::GetDependenciesForTarget(short target, const vector<link>& links)
{
	info_dll flags;
	flags.id = target;
	flags.dep.reserve(200U);
	for (const auto& one : links)
	{
		if (one.target == target)
		{
			flags.dep.push_back(one.source);
		}
	}
	flags.dep.shrink_to_fit();
	return flags;
}

void CReduceDependencies::CreateMapAllDlls(const vector<link>& links)
{
	m_mapAllDlls.clear();
	for (const auto& one : links)
	{
		if (m_mapAllDlls.find(one.target) == m_mapAllDlls.cend())
		{
			m_mapAllDlls[one.target] = GetDependenciesForTarget(one.target, links);
			cout << one.target << "; dep_count = " << m_mapAllDlls[one.target].dep.size() << "\r\n";
		}
	}
}

void CReduceDependencies::AddAllLevelsDependencies(short idTarget, setOfIDs& all)
{
	auto itf = m_mapAllDlls.find(idTarget);
	if (itf == m_mapAllDlls.cend())
	{
		return;
	}
	const auto& oneDllInfo = itf->second;
	if (oneDllInfo.all)
	{
		all.insert(oneDllInfo.all->begin(), oneDllInfo.all->end());
		return;
	}
	for (short id : oneDllInfo.dep)
	{
		all.insert(id);
		AddAllLevelsDependencies(id, all);
	}
}

void CReduceDependencies::FindAllTransient()
{
	for (auto& p : m_mapAllDlls)
	{
		auto& oneDll = p.second;
		cout << "Find all dependencies for id = " << oneDll.id;
		{
			setOfIDs all;
			for (short id : oneDll.dep)
			{
				AddAllLevelsDependencies(id, all);
			}
			if (!all.empty())
			{
				for (short id : oneDll.dep)
				{
					if (all.find(id) != all.cend())
					{
						oneDll.transient.push_back(id);
					}
				}
			}
			all.insert(oneDll.dep.cbegin(), oneDll.dep.cend());
			oneDll.all = make_unique<setOfIDs>(std::move(all));
		}
		cout << " " << oneDll.dep.size() << "/" << oneDll.all->size() << "/" << oneDll.transient.size() << "\r\n";
	}
}
