export class AgeGroup {
  private ageGroups = [
    {name: "Adult", id: 0},
    {name: "Childish", id: 1},
    {name: "Others", id: 2},
  ];
  getAllAgeGroups(){
    return this.ageGroups.slice();
  }

  getCornflakeTpye(id){
    for (let ageGroup of this.ageGroups) {
      if(id === ageGroup.id){
        return ageGroup.name
      }
    }
  }
}
