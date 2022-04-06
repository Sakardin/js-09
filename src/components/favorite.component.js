import { Component } from '../core/component'
import { apiService } from '../services/api.service'
import { renderPost } from '../templates/post.template'

let posts =[]

export class FavoriteComponent extends Component {
  constructor(id, options) {
    super(id)

    this.loader = options.loader
  }

  init() {
    this.$el.addEventListener('click', linkClickHandler.bind(this))
  }

  async onShow() {
    this.loader.show()
    posts = await titleById()
    const html = renderList(posts)
    this.$el.insertAdjacentHTML('afterbegin', html)
    this.loader.hide()
  }

  onHide() {
    this.$el.innerHTML = ''
  }
}

function linkClickHandler(event) {
  event.preventDefault()

  if(event.target.classList.contains('js-link')){
    const postId = posts.find((p) => p.title === event.target.innerText)
    this.$el.innerHTML = ''
    this.$el.insertAdjacentHTML('afterbegin', renderPost(postId, {withButton: false}))
  }
}

function renderList(list = []) {
  if (list && list.length) {
    return `
      <ul>
        ${list.map(i => `<li><a href="#" class="js-link">${i.title}</a></li>`).join(' ')}
      </ul>
    `
  }

  return `<p class="center">Nothing to show</p>`
}

async function titleById() {

  const favorites = JSON.parse(localStorage.getItem('favorites'))
  const titles = await Promise.all(favorites.map(p => apiService.fetchFavoritePosts(p)
    ))
   return titles



}

