var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql=require('mysql');
var cors=require('cors');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const router = require('./routes/index');
const { param } = require('./routes/index');
const { table } = require('console');

var app = express();
app.use(cors())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "tigerchlm11#",
    database:"mydb"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });
  
  
  
 
  
  // var sql="update studentList SET ID=(0 + 1)";
  // con.query(sql,function(err,res){
  //   if(err) throw err;
  //   console.log("ok");
  // })
  
  
  var sql="ALTER TABLE studentList  AUTO_INCREMENT=1"
  con.query(sql,function(err,rs){
       if (err) throw err;
       console.log("changed"); 
  })
  

app.post('/create',(req,res)=> {
      const firstName = req.body.firstName;
      const lastName = req.body.lastName;
      const location= req.body.location;
      const email = req.body.email;
      const date = req.body.date;
      const month = req.body.month;
      const year = req.body.year; 
      const education = req.body.education;
    
      
      var sql='INSERT INTO studentList(firstName,lastName,location,email,dob,education)VALUES?'
      values=[
        [firstName,lastName,location,email,date+"/"+month+"/"+year,education,]
      ]
      con.query(sql,[values],function(err){
        if (err) throw err;
        console.log("inserted")
      })
    
})
app.get('/studentManagement',function(req,res){
       con.query("SELECT * FROM studentList",function(err,results){
        if (err) throw err;
        res.write('<head> <link rel="stylesheet" href="/stylesheets/style.css" />')
        res.write('<link rel="stylesheet" href="/stylesheets/alertify.min.css" />')
        res.write('<link rel="stylesheet" href="/stylesheets/alertify.css" id="toggleCSS" />')
        res.write('</head>');
        res.write('<h1>Student management system</h1>');
        res.write('<br>');
        res.write('<script src="alertify.min.js"</script>')
        res.write('<script src="https://kit.fontawesome.com/7c50005047.js" crossorigin="anonymous"></script>');
        res.write('<form action="/search">');
        res.write(`<div class="font"><input type="search" name="firstName" class="search" placeholder="Search" /><i class="fas fa-search"></i></div>`);
        //res.write(`<input type="submit" value="search" />`);
        res.write('</form>')
        res.write('<a href="http://localhost:3000" class="a">ADD</a>');
        res.write('<br>');
        res.write('<br>');
        
        res.write('<table><tr><th>ID</th><th>First Name</th><th>Last Name</th><th>Location</th><th>email</th><th>DOB</th><th>Education</th><th>Action</th><th>Delete</th></tr>');
        for(x of results){
            
            res.write(`<tr><td>`+x.ID+`</td><td>`+x.firstName+`</td><td>`+x.lastName+`</td><td>`+x.location+`</td><td>`+x.email+`</td><td>`+x.dob+`</td><td>`+x.education+`</td><td><a class="e1" href="/edit?id=`+x.ID+`" > <i class="fas fa-user-edit"></i>Edit</a></td><td><a class="d1" onClick="return confirm('Are u sure u wanna delete')"  href="/delete?id=`+x.ID+`" ><i class="fas fa-trash-alt"></i> delete</a></td></tr>`);
           
        }
       
        res.end('</table');
        
       // href="/delete?id=`+x.ID+`"
       });
       
       

        
    
       
});

app.get('/edit',function(req,res){
    
      
     con.query("SELECT * FROM studentList WHERE ID=?",req.query.id,function(err,rs,next){
      var x=rs[0].dob;
        var z=x.split("/");
        var m=z[0];
        console.log(m);
        res.render('index1', {y : rs[0] ,x : rs[0].dob.split("/")})
      //  res.render('index1',{x : rs[0].dob.split("/")});
           
    })
})
app.post('/edit',function(req,res,next){
    
    

con.query("UPDATE studentList SET firstName='"+req.body.firstName+"',lastName='"+req.body.lastName+"',location='"+req.body.location+"',email='"+req.body.email+"',dob='"+req.body.date+"/"+req.body.month+"/"+req.body.year+"',education='"+req.body.education+"' WHERE ID="+ req.query.id+"",function(err,rs){
        if (err) throw err;  
      res.redirect('/studentManagement');
    
    })
})
app.get('/delete',function(req,res){
  con.query("DELETE FROM studentList WHERE ID=?",req.query.id,function(err,result){
    if (err) throw err;
    console.log("deleted");
    console.log(req.query.id);
    res.redirect('/studentManagement');
    
  })
  var sql="ALTER TABLE studentList DROP ID"
  con.query(sql,function(err,rs){
       if (err) throw err;
       console.log("id droped"); 
  })
  var sql="ALTER TABLE studentList ADD COLUMN ID int AUTO_INCREMENT PRIMARY KEY"
  con.query(sql,function(err,rs){
       if (err) throw err;
       console.log("id addeed"); 
  })
  

 
})

app.get('/search',function(req,res){
  var firstName=req.query.firstName;
  var fn=firstName.charAt(0);
  con.query("SELECT * FROM studentList WHERE firstName LIKE '"+fn+"%'",(err,rs)=>{
    if (err) throw err;
    res.render('table',{s : rs})

  })
})

app.listen(3001);
