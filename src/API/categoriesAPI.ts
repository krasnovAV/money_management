import axios from "axios";


export const categoriesAPI = {
    getSavedCategories(id: string) {
        return axios.get<SavedCategoriesType[]>("http://localhost:3002/savedCategoriesList", {params: {id}})
    },

    updateSavedCategories(id: string, categories: string[]) {
        return axios.put<SavedCategoriesType[]>("http://localhost:3002/savedCategoriesList/" + id,
            {
                categories: categories,
                id: id
            })
    },
    setDefaultSavedCategories(id: string, categories: string[]) {
        return axios.post("http://localhost:3002/savedCategoriesList/",
            {
                categories, id
            })
    },
}

type SavedCategoriesType = {
    id: string,
    categories: string[],
}