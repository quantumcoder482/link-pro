import React from 'react';
import {
    handleRotateChange,
    handleScaleChange,
} from '../Services/ImageService';
import {HiMinus, HiPlus} from 'react-icons/hi';

const CropTools = ({
                           rotate,
                           setRotate,
                           scale,
                           setScale,
}) => {
    return (

        <div className="crop_tools">
            <div className="column">
                <a href="#" className="number_control" onClick={(e) => handleScaleChange(e, scale, setScale, "decrease")}>
                    <HiMinus />
                </a>
                <div className="relative">
                    <input
                        className="active animate"
                        id="scale-input"
                        type="text"
                        step="0.1"
                        value={scale}
                        onChange={(e) => setScale(Number(e.target.value))}
                    />
                    <label className="crop" htmlFor="scale-input">Scale</label>
                </div>
                <a href="#" className="number_control" onClick={(e) => handleScaleChange(e, scale, setScale, "increase")}>
                    <HiPlus />
                </a>
            </div>
            <div className="column">
                <a href="#" className="number_control" onClick={(e) => handleRotateChange(e, rotate, setRotate, "decrease")}>
                    <HiMinus />
                </a>
                <div className="relative">
                    <input
                        className="active animate"
                        id="rotate-input"
                        type="text"
                        value={rotate}
                        onChange={(e) =>
                            setRotate(Math.min(180, Math.max(-180, Number(e.target.value))))
                        }
                    />
                    <label className="crop" htmlFor="rotate-input">Rotate</label>
                </div>
                <a href="#" className="number_control" onClick={(e) => handleRotateChange(e, rotate, setRotate, "increase")}>
                    <HiPlus />
                </a>
            </div>
        </div>

    );
};

export default CropTools;
