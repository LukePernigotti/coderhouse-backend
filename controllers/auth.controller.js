const register = async (req, res, next) => res.redirect('/');
const login = async (req, res, next) => { 
  res.redirect('/')
};

export {
  login,
  register,
}