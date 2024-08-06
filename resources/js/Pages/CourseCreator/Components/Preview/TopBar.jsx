import React from 'react';

const TopBar = ({
                    data,
                    completedCrop,
                    nodesRef
}) => {

    return (
        <div className="top_section" style={{
            background: data['header_color']
        }}>
            <div className="logo">
                {completedCrop?.logo ?
                    <canvas
                        ref={ref => nodesRef.current["logo"] = ref}
                        style={{
                            width: completedCrop["logo"]?.isCompleted ? `100%` : 0,
                            height: completedCrop["logo"]?.isCompleted ? `auto` : 0,
                            backgroundSize: `cover`,
                            backgroundRepeat: `no-repeat`,
                        }}
                    />
                    :
                    <img src={data["logo"] || Vapor.asset("images/logo.png") } alt=""/>
                }
            </div>
            {data['title'] &&
                <h2 id="preview_title_section" className="title" style={{
                    color: data['header_text_color'],
                    fontSize: data['header_font_size'] + 'rem',
                }}>{data['title']}</h2>
            }
        </div>

    );
};

export default TopBar;
