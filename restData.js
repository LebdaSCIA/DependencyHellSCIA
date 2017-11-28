module.exports = function () {
    var data = {
        sciaDlls: [
            { id: 0, name: "Child.dll", category: "Kernel", status: "ok", coment: "Node" },
            { id: 1, name: "Child2.dll", category: "Kernel", status: "ok", coment: "Node" },
            { id: 2, name: "Parent.dll", category: "Kernel", status: "ok", coment: "Node" }
        ],
        sciaDllDeps: [
            { dllSource: 0, dllTarget: 2 },
            { dllSource: 1, dllTarget: 2 }
        ]
    }
    return data
}