const _ = require('lodash');
const moment = require('moment');
const Post = require('./post.model.js');
const User = require('../user/user.model');

const { pickBy, isNull, isUndefined } = _

const resolvers = {
  Query: {
    getAllPosts: () => Post.find({}),
  },
  Mutation: {
    createPost: (parent, {title, content, userId}) => {
      const createdAt = String(+moment())
      return User.findById(userId)
        .exec()
        .then(author => {
          // TODO add error handlers
          const newPost = new Post({ title: title, content: content, createdAt, updatedAt: createdAt, author: author._id })
          return newPost.save()
            .then(post => {
              author.posts.push(post)
              return author.save()
                .then(() => {
                  return post
                })
            })
        })
    },
    updatePost: (parent, { title, content, postId, localUpdatedAt }) => {
      const updatedAt = String(+moment())
      const updatedPost = pickBy({ title, content }, el => !isNull(el) && !isUndefined(el))
      return Post.findByIdAndUpdate(postId, { ...updatedPost, updatedAt }, {new: true})
        .exec()
        .then(post => post)
    },
    updatePosts: (parent, data) => {
      const array = data.posts.map(item => {
        const { noteId } = item
        const obj = {}

        Object.keys(item).forEach(element => {
          if (element === 'localUpdatedAt' && obj[element]) {
            obj.updatedAt = obj[element]
            return
          }
          if (item[element]) obj[element] = item[element]
        })

        return {
          updateOne: {
            filter: { _id: noteId },
            update: { ...obj },
          }
        }
      })

      return Post.bulkWrite(array)
        .then(res =>
          User.findById(data.userId)
            .populate('posts')
            .exec()
            .then(p => p.posts))
    },
    deletePost: (parent, { id }) => {
      return Post.findByIdAndDelete(id)
        .exec()
        .then(post => post)
    }
  }
};

module.exports = resolvers;