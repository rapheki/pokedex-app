import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderby'
})
export class OrderbyPipe implements PipeTransform {

  transform(array: Array<any>, orderField: string): Array<any> {
    // var orderType = (orderField.substring(1) === '-') ? 'DESC' : 'ASC';

    let orderFieldSplit = orderField.split('-');

    // Sort by id
    if (orderFieldSplit[orderFieldSplit.length-1] == "id") {

      console.log("sort by id");

      // 'DESC'
      if (orderFieldSplit[0] === '-') {
        array.sort(function(a, b) {
          console.log(parseInt(a[orderField]), parseInt(b[orderField]), (parseInt(a[orderField]) < parseInt(b[orderField])))
          if (parseInt(a[orderField]) < parseInt(b[orderField])) return 1;
          if (parseInt(a[orderField]) > parseInt(b[orderField])) return -1;
          return 0;
        });
      }
      // 'ASC'
      else {
        array.sort(function(a, b) {
          if (parseInt(a[orderField]) < parseInt(b[orderField])) return -1;
          if (parseInt(a[orderField]) > parseInt(b[orderField])) return 1;
          return 0;
        });
      }
    }

    else if (orderFieldSplit[orderFieldSplit.length-1] == "ename") {
      // 'DESC'
      if (orderFieldSplit[0] === '-') {
        array.sort(function(a, b) {
          if (a[orderField] < b[orderField]) return 1;
          if (a[orderField] > b[orderField]) return -1;
          return 0;
        });
      }
      // 'ASC'
      else {
        array.sort(function(a, b) {
          if (a[orderField] < b[orderField]) return -1;
          if (a[orderField] > b[orderField]) return 1;
          return 0;
        });
      }
    }

    else if (orderFieldSplit[orderFieldSplit.length-1] == "etype") {
      // 'DESC'
      if (orderFieldSplit[0] === '-') {
        array.sort(function(a, b) {
          if (a[orderField][0] < b[orderField][0]) return 1;
          if (a[orderField][0] > b[orderField][0]) return -1;
          return 0;
        });
      }
      // 'ASC'
      else {
        array.sort(function(a, b) {
          if (a[orderField][0] < b[orderField][0]) return -1;
          if (a[orderField][0] > b[orderField][0]) return 1;
          return 0;
        });
      }
    }

    return array;

  }

}
