export default function findMissingFields(fieldsArr){
    let missingArray = [];
    for(let i = 0; i < fieldsArr.length; i++){
        if(!fieldsArr[i][0]){
            missingArray.push(fieldsArr[i][1]);
        }
    }
    
    return missingArray;
}