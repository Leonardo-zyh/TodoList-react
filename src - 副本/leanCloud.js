import AV from 'leancloud-storage'
var APP_ID = '1tQJosYf47DrGlSBzUF0hkRm-gzGzoHsz';
var APP_KEY = '5zJnoxUAoJD4DV1K28et83WV';

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

export default AV
// 所有跟 Todo 相关的 LeanCloud 操作都放到这里
export const TodoModel = {     //*批量操作
  getByUser(user, successFn, errorFn) {
    var query = new AV.Query('Todo');
    query.equalTo('deleted', false);
    query.find().then((response) => {
      let array = response.map((t) => {
        return { id: t.id, ...t.attributes }
      })
      successFn.call(null, array)
    }, (error) => {
      errorFn && errorFn.call(null, error)
    })
  },

  create({ status, title, deleted }, successFn, errorFn) {
    let Todo = AV.Object.extend('Todo')
    let todo = new Todo()
    todo.set('title', title)
    todo.set('status', status)
    todo.set('deleted', deleted)
    //单用户权限设置
    let acl = new AV.ACL()
    acl.setPublicReadAccess(false) // 这里是 false
    acl.setWriteAccess(AV.User.current(), true)
    acl.setReadAccess(AV.User.current(), true)
    todo.setACL(acl)
    todo.save().then((response) => {
      successFn.call(null, response.id)
    }, (error) => {
      error && errorFn.call(null, error)
    })
  },
  updata({ id, title, status, deleted }, successFn, errorFn) {
    var todo = AV.Object.createWithoutData('Todo', id);  
    // 修改属性
    title !== undefined && todo.set('title', title)
    status !== undefined && todo.set('status', status)
    deleted !== undefined && todo.set('deleted', deleted)   
    // 保存到云端
    todo.save().then((response)=>{
      successFn && successFn.call(null)
    },(error)=>{
      errorFn && errorFn.call(null,error)
    })
  },
  destroy(todoId, successFn, errorFn) {
    TodoModel.updata({id: todoId, deleted: true}, successFn, errorFn)
   /* var todo = AV.Object.createWithoutData('Todo', todoId);
    todo.destroy().then(function (response) {
      successFn && successFn.call(null)//删除成功
    }, function (error) {
      errorFn && errorFn.call(null.error)
    });*/
  }
}

export function signUp(email, username, password, successFn, errorFn) {
  // 新建 AVUser 对象实例
  var user = new AV.User();
  // 设置用户名
  user.setUsername(username);
  // 设置密码
  user.setPassword(password);
  // 设置邮箱
  user.setEmail(email);
  user.signUp().then(function (loginedUser) {
    let user = getUserFromAVUser(loginedUser)
    successFn.call(null, user)
  }, function (error) {
    errorFn.call(null, error)
  });
  return undefined
}

export function signIn(username, password, successFn, errorFn) {
  AV.User.logIn(username, password).then(function (loginedUser) {
    let user = getUserFromAVUser(loginedUser);
    successFn.call(null, user)
  }, function (error) {
    errorFn.call(null, error)
  });
}

export function getCurrentUser() {
  let user = AV.User.current()
  if (user) {
    return getUserFromAVUser(user)
  } else {
    return null
  }
}

export function signOut() {
  AV.User.logOut();
  // 现在的 currentUser 是 null 了
  //var currentUser = AV.User.current();
  return undefined
}

export function sendPasswordResetEmail(email, successFn, errorFn) {
  AV.User.requestPasswordReset(email).then(function (success) {
    successFn.call()
  },
    function (error) {
      errorFn.call(null, error)
    })
}

function getUserFromAVUser(AVUser) {
  return {
    id: AVUser.id,
    ...AVUser.attributes  //把 AVUser.attributes 的属性拷贝到这个对象

  }
}
