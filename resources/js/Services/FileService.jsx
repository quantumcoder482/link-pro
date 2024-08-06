import axios from 'axios';
import EventBus from '@/Utils/Bus.jsx';

export const createFile = (
    file,
    setUpFile,
) => {
    let reader = new FileReader();
    reader.addEventListener('load', (e) => {
        setUpFile(e.target.result);
    });
    reader.readAsDataURL(file);
};

export const uploadSectionFile = (id, packets) => {
    return axios.patch('/creator-center/course/update-section-file/' + id, packets)
    .then(
        (response) => {
            const returnMessage = JSON.stringify(response.data.message);
            EventBus.dispatch("success", { message: returnMessage.replaceAll("_", " ") });

            return {
                success : true,
                filePath: response.data.filePath
            }
        }
    )
    .catch((error) => {
        if (error.response !== undefined) {
            EventBus.dispatch("error",
                {message: "There was an error saving your image."});
            console.error("ERROR:: ", error.response.data);
        } else {
            console.error("ERROR:: ", error);
        }

        return {
            success : false,
        }

    });
}

export const getFileParts = (file) => {

    const fileArray = file.split('/');
    const fileNameAndExt = fileArray[fileArray.length - 1].split(".");

    return {
        name: fileNameAndExt[0],
        type: fileNameAndExt[1]
    }

}
