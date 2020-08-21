export class CornflakesType {
  private allCornflakesType = [{name: "Fruity", id: 0},
    {name: "Crispy", id: 1},
    {name: "Sweet", id: 2},
    {name: "Salty", id: 3}
  ];

  getAllCornflakeTypes() {
    return this.allCornflakesType.slice();
  }

  getCornflakeTpye(id) {
    for (let cornflakeType of this.allCornflakesType) {
      if(id === cornflakeType.id){
        return cornflakeType.name
      }
    }
  }
}
