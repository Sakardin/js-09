class ApiService {
    constructor(baseURL) {
        this.url = baseURL
    }

    async createPost(post) {
        try {
            const request = new Request(this.url + '/posts.json', {
                method: 'post',
                body: JSON.stringify(post)
            })
            return useRequest(request)
        } catch (error) {
            console.error(error)
        }
    }

    async fetchPosts() {
        try {
            const request = new Request(`${this.url}/posts.json`, {
                method: 'get'
            })
            return useRequest(request)

        } catch (error) {
            console.error(error)
        }
    }

    async fetchPostById(id){
        try {
            const request = new Request(`${this.url}/posts/${id}.json`, {
                method: 'get'
            })
            return useRequest(request)

        } catch (error) {
            console.error(error)
        }

    }
}
    async function useRequest(request) {
        const responce = await fetch(request)
        return await responce.json()

    }


export const apiService = new ApiService('https://js-09-seka-default-rtdb.firebaseio.com')