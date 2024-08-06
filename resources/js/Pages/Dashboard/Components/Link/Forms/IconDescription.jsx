import React, {useState} from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextComponent from './TextComponent';

const IconDescription = ({
                             currentLink,
                             setCurrentLink,
                             descChecked,
                             setDescChecked,
}) => {

    const [showTiny, setShowTiny] = useState(false);

    return (
        <div className="row">
            <div className="col-12">
                <FormControlLabel
                    label={"Add Description"}
                    sx={{
                        '.css-ahj2mt-MuiTypography-root' : {
                            fontFamily: "opensanssemibold",
                        }
                    }}
                    control={
                        <Checkbox
                            checked={descChecked}
                            onChange={(e) => setDescChecked(!descChecked)}
                            inputProps={{ 'aria-label': 'controlled' }}
                            sx={{
                                '&.Mui-checked': {
                                    color: '#424fcf',
                                },
                            }}
                        />
                    }
                />
                {descChecked &&
                    <TextComponent
                        currentLink={currentLink}
                        setCurrentLink={setCurrentLink}
                        showTiny={showTiny}
                        setShowTiny={setShowTiny}
                    />
                }
            </div>
        </div>
    );
};

export default IconDescription;
