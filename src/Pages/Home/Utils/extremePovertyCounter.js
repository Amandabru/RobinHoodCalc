const extremePovertyCounter = ([...data]) => {
    var peopleInExtremePoverty = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i].income <= 2) {
        peopleInExtremePoverty += data[i].population;
      } else {
        break;
      }
    }
    return peopleInExtremePoverty;
  };
  
  export default extremePovertyCounter;