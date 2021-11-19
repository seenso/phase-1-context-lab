/* Your Code Here */
function createEmployeeRecord(array) {
    return {
      firstName: array[0], //str
      familyName: array[1], //str
      title: array[2], //str
      payPerHour: array[3], //number type
      timeInEvents: [],
      timeOutEvents: []
    };
  };
  
  function createEmployeeRecords(array) {
    let employeeRecords = [];
  
    array.forEach(nestedArr => {
      let newRecord = createEmployeeRecord(nestedArr);
      employeeRecords.push(newRecord);
    });
  
    return employeeRecords; //arr of objs
  };
  
  function createTimeInEvent(empObj, dateStr) {
    const dateStamp = dateStr.slice(0, 10);
    const hourStamp = parseInt(dateStr.slice(11, 15));
  
    empObj.timeInEvents.push({type: "TimeIn", hour: hourStamp, date: dateStamp});
    return empObj;
  };
  
  
  function createTimeOutEvent(empObj, dateStr) {
    const dateStamp = dateStr.slice(0, 10);
    const hourStamp = parseInt(dateStr.slice(11, 15));
  
    empObj.timeOutEvents.push({type: "TimeOut", hour: hourStamp, date: dateStamp});
    return empObj;
  };
  
  function hoursWorkedOnDate(empObj, dateStr) {
    let timeIn = 0;
    let timeOut = 0;
    const timeInArr = empObj.timeInEvents; //arr of objs
    const timeOutArr = empObj.timeOutEvents; //arr of objs
  
    //find time in for dateStr
    timeInArr.forEach(timeInRecord => {
      if(timeInRecord.date === dateStr) {
        timeIn += timeInRecord.hour;
      }
    });
  
    //find time out for dateStr
    timeOutArr.forEach(timeOutRecord => {
      if(timeOutRecord.date === dateStr) {
        timeOut += timeOutRecord.hour;
      }
    });
    
    //calculate hours worked
    return (timeOut - timeIn)/100; //convert from military HHMM time to decimal
  };
  
  function wagesEarnedOnDate(empObj, dateStr) {
    return hoursWorkedOnDate(empObj, dateStr) * empObj.payPerHour;
  };
  
  function allWagesFor(empObj) {
    let totalWages = 0;
    let dates = empObj.timeOutEvents; //using timeOut dates in case employee is currently in a shift
  
    dates.forEach(dateRecord => {
      totalWages += wagesEarnedOnDate(empObj, dateRecord.date);
    });
  
    return totalWages;
  };
  
  function calculatePayroll(array) {
    let payroll = 0;
  
    array.forEach(employee => {
      payroll += allWagesFor(employee);
    });
  
    return payroll;
  };

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

