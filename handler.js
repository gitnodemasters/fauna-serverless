const faunadb = require('faunadb')
const q = faunadb.query;

const serverClient = new faunadb.Client({ 
  secret: process.env.FAUNA_ROOT_KEY,
  domain: process.env.FAUNA_DOMAIN,
});

// Create Book Route
module.exports.createBook = async (event, context, callback) => {
  const data = JSON.parse(event.body);
  try {
    const newBook = await serverClient.query(
      q.Create(
        q.Collection('Books'),
        { data },
      )
    )
    callback(null, {
      statusCode: 201,
      body: JSON.stringify(newBook)
    }); 
  } catch (error) {
    throw new Error(error)
  }
}

// Get Book
module.exports.book = async (event, context, callback) => {
  try {
    const book = await serverClient.query(
      q.Get(
        q.Ref(q.Collection('Books'), 
        event.pathParameters.id
        )
      )
    )
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(book)
    }); 
  } catch (error) {
    throw new Error(error)
  }
}

// Delete Book
module.exports.deleteBook = async (event, context, callback) => {
  try {
    const book = await serverClient.query(
      q.Delete(
        q.Ref(q.Collection('Posts'), 
        event.pathParameters.id
        )
      )
    )
    callback(null, {
      statusCode: 204,
      body: JSON.stringify(book)
    }); 
  } catch (error) {
    throw new Error(error)
  }
}

// Update Book
module.exports.updateBook = async (event, context, callback) => {
  const data = JSON.parse(event.body);
  try {
    const book = await serverClient.query(
      q.Update(
        q.Ref(q.Collection('Books'), event.pathParameters.id),
        { data },
      )
    )
    callback(null, {
      statusCode: 201,
      body: JSON.stringify(book)
    }); 
  } catch (error) {
    throw new Error(error)
  }
}
