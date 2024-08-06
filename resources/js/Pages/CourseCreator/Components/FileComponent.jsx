import React, {useEffect, useState} from 'react';
import {MdEdit} from 'react-icons/md';
import {getFileParts, uploadSectionFile} from '@/Services/FileService.jsx';
import {toLower} from 'lodash';
import EventBus from '@/Utils/Bus.jsx';

const FileComponent = ({
                           elementName,
                           setShowLoader,
                           currentSection,
                           sections,
                           setSections,
                           index
}) => {

    const [disableButton, setDisableButton] = useState(true);
    const [upFile, setUpFile] = useState('');
    const [fileName, setFileName] = useState("");
    const [currentFileName, setCurrentFileName] = useState("");

    useEffect(() => {
        if (currentSection.file) {
            const fileNameObj = getFileParts(currentSection.file);
            const fileName = fileNameObj.name + "." + fileNameObj.type;
            setFileName(fileName);
            setCurrentFileName(fileName);
        }
    }, []);
    const onSelectFile = (e) => {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length) {
            return;
        }
        setDisableButton(false);
        document.querySelector("." + CSS.escape(elementName) + "_" + index + "_form .bottom_section").classList.remove("hidden");
        if (window.innerWidth < 993) {
            document.querySelector("." + CSS.escape(elementName)  + "_" + index + "_form").scrollIntoView({
                behavior: "smooth",
            });
        }
        setFileName(files[0].name)
        setUpFile(files[0]);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowLoader({
            show: true,
            icon: 'upload',
            position: 'fixed'
        });
        Vapor.store(
            upFile,
            {
                visibility: "public-read",
                progress: progress => {
                    setShowLoader(prev => ({
                        ...prev,
                        progress: Math.round(progress * 100)
                    }))
                },
            }
        ).then((response) => {
            const packets = {
                [`${elementName}`]: response.key,
                ext: response.extension,
                name: fileName.split('.')[0].replace(/[,\/#!$%\^&\*;:{}=\-_'`~()]/g, '').replaceAll(" ", "-")
            };

            uploadSectionFile(currentSection.id, packets)
            .then(response => {
                if (response.success) {
                    setSections(sections.map((section) => {
                        if (section.id === currentSection.id) {
                            return {
                                ...section,
                                file: response.filePath,
                            }
                        }
                        return section;
                    }));

                    setUpFile(null);
                    document.querySelector(
                        "." + CSS.escape(elementName)  + "_" + index +
                        "_form .bottom_section").
                        classList.
                        add("hidden");
                }

                setShowLoader({show: false, icon: null, position: "", progress: null})
            }).catch((error) => {
                console.error(error);
                EventBus.dispatch("error", { message: "There was an error saving your file." });
                setShowLoader({show: false, icon: null, position: "", progress: null})
            });
        });
    }

    const handleCancel = (e) => {
        e.preventDefault();
        setUpFile(null);
        setFileName(currentFileName);
        document.querySelector("." + CSS.escape(elementName) + "_form .bottom_section").classList.add("hidden");
    }

    return (
        <article className="my_row page_settings">
            <div className="column_wrap">
                <form onSubmit={handleSubmit} className={`${elementName}_${index}_form`}>
                    <div className="top_section">
                        <label
                            htmlFor={`${elementName}_${index}_upload`}
                            className="custom"
                        >
                            {
                                fileName ? toLower(fileName) : "Upload File"
                            }
                            <span className="edit_icon">
                                <MdEdit/>
                                <div className="hover_text edit_image">
                                    <p>Upload File</p>
                                </div>
                            </span>
                        </label>

                        <input
                            className={`custom`}
                            id={`${elementName}_${index}_upload`}
                            type="file"
                            accept=".doc,.docx,application/msword,application/pdf,.mp4,.mp3"
                            onChange={onSelectFile}
                        />
                    </div>
                    <div className="my_row info_text file_types">
                        <p className="m-0 char_count w-100 ">
                            Allowed File Types:
                            <span>.pdf, .doc, .docx, msword, .mp4, .mp3</span>
                        </p>
                    </div>
                    <div className="bottom_section hidden">
                        <div className="bottom_row">
                            <button
                                type="submit"
                                className="button green"
                                disabled={disableButton}
                            >
                                Save
                            </button>
                            <a
                                className="button transparent gray"
                                href="#"
                                onClick={(e) => {
                                    handleCancel(e);
                                }}
                            >
                                Cancel
                            </a>
                            <a
                                className="help_link"
                                href="mailto:help@link.pro"
                            >
                                Need Help?
                            </a>
                        </div>
                    </div>
                </form>
            </div>
        </article>
    );
};

export default FileComponent;
