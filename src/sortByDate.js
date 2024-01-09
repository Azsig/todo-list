import { compareAsc } from "date-fns";

function sorting(list){
    let dateList = []
    for (let i = 0; i< list.length; i++){
        dateList.push(list[i].date);
    }
    dateList.sort(compareAsc);
    
    let sortList = []
    for(let i = 0; i < dateList.length; i++){
        for(let j = 0; j< list.length; j++){
            if(list[j].date == dateList[i]){
                sortList[i] = list[j];
            }
        }
    }

    return sortList;

}

export default sorting