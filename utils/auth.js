const withAuth = (req, res, next) => {
//if user not logged in, go to longgin page
  if(!req.session.loggedIn){
    res.redirect('/login');
//if logged in, go next
  }else{
    next();
  } 
 
};

module.exports = withAuth;