import {useState} from 'react';
import { AccordionData } from '../AccordionData';

const Accordion = () => {

    const [activeIndex, setActiveIndex] = useState(0);

    const handleClick = (index) => {
        if(activeIndex === index) {
            setActiveIndex(null);
        } else {
            setActiveIndex(index);
        }

        setTimeout(function(){
            document.querySelector('.accordion-content.open').scrollIntoView({
                behavior: 'smooth',
                block: "center",
                inline: "center"
            });

        }, 400)

    }
    return (
        <>

            <div className="accordion_row my_row top_row">
                <div className="content_wrap">
                    <div className="logo_wrap">
                        <img src={ Vapor.asset('images/logo.png')} alt=""/>
                    </div>
                    <div className="title_wrap my_row">
                        <div className="title my_row" onClick={(e) => {handleClick(8)}}>
                            <div className="number">
                                <h5>11</h5>
                            </div>
                            <img src={ Vapor.asset('images/' + AccordionData[8].image) } alt=""/>
                            {/*<div>{isActive ? '-' : '+'}</div>*/}
                        </div>
                        <div className={activeIndex === 8 ? "accordion-content open" : "accordion-content"} >
                            <p>{AccordionData[8].content}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="two_columns my_row">
                <div className="column">
                    <div className="my_row accordion_row">
                        <div className="title_wrap my_row">
                            <div className="title my_row" onClick={(e) => {handleClick(0)}}>
                                <div className="number">
                                    <h5>1</h5>
                                </div>
                                <img src={ Vapor.asset('images/' + AccordionData[0].image) } alt=""/>
                            </div>
                        </div>

                        <div className="accordion_content_wrap">
                            <div className={activeIndex === 0 ? "accordion-content open" : "accordion-content"} >
                                <p>{AccordionData[0].content}</p>
                                {AccordionData[0].subTitle && <h5>{AccordionData[0].subTitle}</h5>}
                                {AccordionData[0].subContent && <p>{AccordionData[0].subContent}</p>}
                            </div>
                        </div>
                    </div>
                    <div className="my_row accordion_row">
                        <div className="title_wrap my_row">
                            <div className="title my_row" onClick={(e) => {handleClick(1)}}>
                                <div className="number">
                                    <h5>2</h5>
                                </div>
                                <img src={ Vapor.asset('images/' + AccordionData[1].image) } alt=""/>
                            </div>
                        </div>
                        <div className="accordion_content_wrap">
                            <div className={activeIndex === 1 ? "accordion-content open" : "accordion-content"} >
                                <p>{AccordionData[1].content}</p>
                                {AccordionData[1].subTitle && <h5>{AccordionData[1].subTitle}</h5>}
                                {AccordionData[1].subContent && <p>{AccordionData[1].subContent}</p>}
                            </div>
                        </div>
                    </div>
                    <div className="my_row accordion_row">
                        <div className="title_wrap my_row">
                            <div className="title my_row" onClick={(e) => {handleClick(2)}}>
                                <div className="number">
                                    <h5>3</h5>
                                </div>
                                <img src={ Vapor.asset('images/' + AccordionData[2].image) } alt=""/>
                            </div>
                        </div>
                        <div className="accordion_content_wrap">
                            <div className={activeIndex === 2 ? "accordion-content open" : "accordion-content"}>
                                <p>{AccordionData[2].content}</p>
                                {AccordionData[2].subTitle && <h5>{AccordionData[2].subTitle}</h5>}
                                {AccordionData[2].subContent && <p>{AccordionData[2].subContent}</p>}
                            </div>
                        </div>
                    </div>

                    <div className="my_row accordion_row">
                        <div className="title_wrap my_row">
                            <div className="title my_row" onClick={(e) => {handleClick(3)}}>
                                <div className="number">
                                    <h5>4</h5>
                                </div>
                                <img src={ Vapor.asset('images/' + AccordionData[3].image) } alt=""/>
                            </div>
                        </div>
                        <div className="accordion_content_wrap">
                            <div className={activeIndex === 3 ? "accordion-content open" : "accordion-content"}>
                                <p>{AccordionData[3].content}</p>
                                {AccordionData[3].subTitle && <h5>{AccordionData[3].subTitle}</h5>}
                                {AccordionData[3].subContent && <p>{AccordionData[3].subContent}</p>}
                            </div>
                        </div>
                    </div>

                    <div className="my_row accordion_row">
                        <div className="title_wrap my_row">
                            <div className="title my_row" onClick={(e) => {handleClick(4)}}>
                                <div className="number">
                                    <h5>5</h5>
                                </div>
                                <img src={ Vapor.asset('images/' + AccordionData[4].image) } alt=""/>
                            </div>
                        </div>
                        <div className="accordion_content_wrap">
                            <div className={activeIndex === 4 ? "accordion-content open" : "accordion-content"}>
                                <p>{AccordionData[4].content}</p>
                                {AccordionData[4].subTitle && <h5>{AccordionData[4].subTitle}</h5>}
                                {AccordionData[4].subContent && <p>{AccordionData[4].subContent}</p>}
                            </div>
                        </div>
                    </div>

                    <div className="my_row accordion_row">
                        <div className="title_wrap my_row">
                            <div className="title my_row" onClick={(e) => {handleClick(5)}}>
                                <div className="number">
                                    <h5>6</h5>
                                </div>
                                <img src={ Vapor.asset('images/' + AccordionData[5].image) } alt=""/>
                            </div>
                        </div>
                        <div className="accordion_content_wrap">
                            <div className={activeIndex === 5 ? "accordion-content open" : "accordion-content"}>
                                <p>{AccordionData[5].content}</p>
                                {AccordionData[5].subTitle && <h5>{AccordionData[5].subTitle}</h5>}
                                {AccordionData[5].subContent && <p>{AccordionData[5].subContent}</p>}
                            </div>
                        </div>
                    </div>

                    <div className="my_row accordion_row">
                        <div className="title_wrap my_row">
                            <div className="title my_row" onClick={(e) => {handleClick(6)}}>
                                <div className="number">
                                    <h5>7</h5>
                                </div>
                                <img src={ Vapor.asset('images/' + AccordionData[6].image) } alt=""/>
                            </div>
                        </div>
                        <div className="accordion_content_wrap">
                            <div className={activeIndex === 6 ? "accordion-content open" : "accordion-content"}>
                                <p>{AccordionData[6].content}</p>
                                {AccordionData[6].subTitle && <h5>{AccordionData[6].subTitle}</h5>}
                                {AccordionData[6].subContent && <p>{AccordionData[6].subContent}</p>}
                            </div>
                        </div>
                    </div>

                    <div className="my_row button_row">
                        <span className="button_wrap">
                            <span>OPEN LIVE PAGE</span>
                        </span>

                    </div>

                    <div className="my_row accordion_row">
                        <div className="title_wrap my_row">
                            <div className="title my_row"  onClick={(e) => {handleClick(7)}}>
                                <div className="number">
                                    <h5>8</h5>
                                </div>
                                <img src={ Vapor.asset('images/' + AccordionData[7].image) } alt=""/>
                            </div>
                        </div>
                        <div className="accordion_content_wrap">
                            <div className={activeIndex === 7 ? "accordion-content open" : "accordion-content"}>
                                <p>{AccordionData[7].content}</p>
                                {AccordionData[7].subTitle && <h5>{AccordionData[7].subTitle}</h5>}
                                {AccordionData[7].subContent && <p>{AccordionData[7].subContent}</p>}
                            </div>
                        </div>
                    </div>

                    <div className="my_row accordion_row">
                        <div className="title_wrap my_row">
                            <div className="title my_row"  onClick={(e) => {handleClick(10)}}>
                                <div className="number">
                                    <h5>9</h5>
                                </div>
                                <img src={ Vapor.asset('images/' + AccordionData[10].image) } alt=""/>
                            </div>
                        </div>
                        <div className="accordion_content_wrap">
                            <div className={activeIndex === 10 ? "accordion-content open" : "accordion-content"}>
                                <p>{AccordionData[10].content}</p>
                                {AccordionData[10].subTitle && <h5>{AccordionData[10].subTitle}</h5>}
                                {AccordionData[10].subContent && <p>{AccordionData[10].subContent}</p>}
                            </div>
                        </div>
                    </div>

                </div>
                <div className="column">
                    <div className="my_row accordion_row">
                        <div className="title_wrap my_row">
                            <div className="title my_row" onClick={(e) => {handleClick(9)}}>
                                <div className="number">
                                    <h5>10</h5>
                                </div>
                                <img src={ Vapor.asset('images/' + AccordionData[9].image) } alt=""/>
                            </div>
                        </div>
                        <div className={activeIndex === 9 ? "accordion-content open" : "accordion-content"}>
                            <p>{AccordionData[9].content}</p>
                            {AccordionData[9].subTitle && <h5>{AccordionData[9].subTitle}</h5>}
                            {AccordionData[9].subContent && <p>{AccordionData[9].subContent}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Accordion;
