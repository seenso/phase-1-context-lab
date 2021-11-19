/* Your Code Here */

/* KEYWORD DEFINITIONS
    this -- a special obj that is part of the current execution context. The value of this is determined based on how/where the function is invoked.
    call -- a method on a function that calls the function, just like (); USE .CALL() when you need to pass in the "this" keyword. See wagesEarnedOnDate() function.
    bind -- a method that returns a COPY of the function it's called on, but w execution context "set" to the argument(s) passed to bind.
*/

//Seems like we just need to replace the empObj with the 'this' keyword as that's what's in the exec context(or scope) of most of these functions

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
    return array.map(obj => createEmployeeRecord(obj));
  };

//   function createTimeInEvent(empObj, dateStr) {
  function createTimeInEvent(dateStr) {
    const date = dateStr.split(" ")[0];
    const hour = dateStr.split(" ")[1];
    
    const timeObj = {
        type: "TimeIn",
        hour: parseInt(hour),
        date: date
    }
    
    //return the updated employee record
    // console.log("THIS", this); 
                                /* logged {
                                            firstName: 'Byron',
                                            familyName: 'Poodle',
                                            title: 'Mascot',
                                            payPerHour: 3,
                                            timeInEvents: [],
                                            timeOutEvents: []
                                        }
                                    above obj is the employee record passed into this function from indexTest.js
                                */
    this.timeInEvents.push(timeObj);
    return this;
  };
  
  
//   function createTimeOutEvent(empObj, dateStr) {
function createTimeOutEvent(dateStr) {
    // console.log("THIS", this); // this is employee record obj from test
    const date = dateStr.split(" ")[0];
    const hour = dateStr.split(" ")[1];
  
    this.timeOutEvents.push({type: "TimeOut", hour: parseInt(hour), date: date});
    return this;
  };
  
//   function hoursWorkedOnDate(empObj, dateStr) {
function hoursWorkedOnDate(dateStr) {
    // console.log("THIS", this.cRecord); // this returned a large complex obj? this.cRecord seems to = the emp record obj.
    let timeIn = 0;
    let timeOut = 0;
    const timeInArr = this.timeInEvents; //arr of objs
    const timeOutArr = this.timeOutEvents; //arr of objs
  
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
  
//function wagesEarnedOnDate(empObj, dateStr) {
function wagesEarnedOnDate(dateStr) {
    return hoursWorkedOnDate.call(this, dateStr) * this.payPerHour;
  };
  
// function allWagesFor(empObj) {}
// the allWagesFor() function has been given to us at the very bottom

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(emp => emp.firstName === firstName);
};
  
  function calculatePayroll(array) {
    // console.log("THIS", this); //this is undefined so prob need to .call() some funcs
    // let payroll = 0;
  
    // array.forEach(employee => {
    //   payroll += allWagesFor.call(employee); //allWagesFor() doen't have parameters. Look at bottom of page.
    // });
  
    // return payroll;

    const reducer = (previousVal, employee) => previousVal + allWagesFor.call(employee); // test didn't like the {} between previousval and the allWagesFor.call(employee)?
    return array.reduce(reducer, 0);
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

