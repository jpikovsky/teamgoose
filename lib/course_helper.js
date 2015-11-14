var index = 0;

function course(dept, num) {
  return {
    dept: dept,
    num: num
  };
}

var courses = {};

exports.list = (cb) => {
  var list = []
  for(var c in courses){
    list.push({
    dept: c.dept,
    num: c.pass
    });
  }
  cb(undefined, courses);
};

exports.add = (c, cb) => {
    new_course = course(c.dept, c.num);
    courses[index++] = new_course;
    cb(undefined, c);
};