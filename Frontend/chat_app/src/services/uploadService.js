import api from "./api"

const upload = async (file,endpoint)=>{

    const formData = new FormData()

    formData.append("file",file)

    const response = await api.post(
        `/upload/${endpoint}`,
        formData,
        {
            headers:{
                "Content-Type":"multipart/form-data"
            }
        }
    )
    return response.data
}

export const uploadImage = (file)=> upload(file,"image")

export const uploadDocument = (file)=> upload(file,"document")

export const uploadAudio = (file)=> upload(file,"audio")

export const uploadVideo = (file)=> upload(file,"video")