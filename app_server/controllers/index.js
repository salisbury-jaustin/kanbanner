const request = require('request');
const apiOptions = {
  server: 'http://localhost:3000'
};

if (process.env.NODE_ENV === 'production') {
  apiOptions.server = 'https://pure-temple-67771.herokuapp.com';
}

const renderUserBoard= (req, res, responseBody) => {
    let message = null;
    if (!(responseBody instanceof Array)) {
      message = 'API lookup error';
      responseBody = [];
    } else {
      if (!responseBody.length) {
        message = 'No User Found';
      }
    }
    res.render('index',
      {
        title: 'KanBanner',
        pageHeader: {
          title: 'KanBanner',
        },
        user: responseBody[0].user,
        lists: responseBody[0].lists
      }
    );
};

const userBoard = (req, res) => {
    const path = '/api/user/test';
    const requestOptions = {
      url: `${apiOptions.server}${path}`,
      method: 'GET',
      json: {},
    };
    request(
      requestOptions,
      (err, {statusCode}, body) => {
        renderUserBoard(req, res, body);
      }
    );
};

const addList = (req, res) => {
    const path = '/api/list';
    const postData = {
        user: req.body.user,
        lists: [
            {list: req.body.inputAddList, items: []}
        ]
    }
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'POST',
        json: postData 
    };
    request(
      requestOptions,
      (err, {statusCode}) => {
        if (statusCode === 201) {
          res.redirect('/');
        } else {
          showError(req, res, statusCode);
        }
      }
    )
}
const addItem= (req, res) => {
  const path = '/api/addItem';
  const postData = {
    user: req.body.user,
    list: req.body.listAdded,
    item: req.body.inputAddItem
  }
  const requestOptions = {
      url: `${apiOptions.server}${path}`,
      method: 'POST',
      json: postData 
  };
  request(
    requestOptions,
    (err, {statusCode}) => {
      if (statusCode === 201) {
        res.redirect('/');
      } else {
        showError(req, res, statusCode);
      }
    }
  )
}
const delList = (req, res) => {
  const path = '/api/removeList';
  const postData = {
    user: req.body.user,
    list: req.body.inputDeleteList,
  }
  const requestOptions = {
      url: `${apiOptions.server}${path}`,
      method: 'POST',
      json: postData 
  };
  request(
    requestOptions,
    (err, {statusCode}) => {
      if (statusCode === 201) {
        res.redirect('/');
      } else {
        showError(req, res, statusCode);
      }
    }
  )
}
const delItem= (req, res) => {
  const path = '/api/removeItem';
  const postData = {
    user: req.body.user,
    list: req.body.listDeletedFrom,
    item: req.body.inputDeleteItem
  }
  const requestOptions = {
      url: `${apiOptions.server}${path}`,
      method: 'POST',
      json: postData 
  };
  request(
    requestOptions,
    (err, {statusCode}) => {
      if (statusCode === 201) {
        res.redirect('/');
      } else {
        showError(req, res, statusCode);
      }
    }
  )
}
module.exports = {
    userBoard,
    addList,
    addItem,
    delList,
    delItem
};