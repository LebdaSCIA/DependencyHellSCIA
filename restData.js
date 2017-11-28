module.exports = function () {
    var data = {
        sciaDlls: [
            { id: 1, name: "Child.dll", description: "First child", category: "Data" },
            { id: 2, name: "Child2.dll", description: "Second child", category: "BussinesLogic" },
            { id: 3, name: "Parent.dll", description: "Parent", category: "Presentation",
            dllDependency: {dependency:[ 1, 2 ] } }
        ]
    }
    return data
}