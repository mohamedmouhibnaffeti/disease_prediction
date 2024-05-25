export function areAllStringsEmpty(obj: any): boolean {
    if (!obj || typeof obj !== 'object') {
        return true;
    }
    for (const key in obj) {
        if (typeof obj[key] === 'string' && obj[key].trim() !== '') {
            return false;
        }
    }
    return true;
}


export function getAgeCounts(patients: Array<any>) {
    const ageCountMap = new Map();
  
    patients.forEach(({patient}) => {
      const age = patient.age;
      if (ageCountMap.has(age)) {
        ageCountMap.set(age, ageCountMap.get(age) + 1);
      } else {
        ageCountMap.set(age, 1);
      }
    });
  
    const result: any = [];
    ageCountMap.forEach((count, age) => {
      result.push({ age: age, count: count });
    });
  
    return result;
  }