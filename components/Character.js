import { Card } from "@mui/material"
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import styles from "../styles/Characters.module.css"
import { useState, useEffect } from "react";

const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
    },
}));

const Character = ({ name, birthYear, hairColor, eyeColor, gender, homeworld }) => {
    const [homeworldData, setHomeworldData] = useState([]);

    // fetches homeworld data
    const fetchHomeworldData = async () => {
        try {
            const response = await fetch(homeworld);
            const data = await response.json()
            setHomeworldData(data);
        } catch (error) {
            console.log("Error", error)
        }
    };

    useEffect(() => {
        fetchHomeworldData();
    }, []);

    return (
        <HtmlTooltip
            title={
            <div>
                <em>{"Homeworld: "}</em> 
                <b>{homeworldData.length === 0 ? "Loading..." : homeworldData.result.properties.name }</b>
                <br/>
                <em>{"Birth Year:"}</em> {birthYear}
                <br/>
                <em>{"Gender:"}</em> {gender}
                <br/>
                <em>{"Hair Colour:"}</em> {hairColor}
                <br/>
                <em>{"Eye Colour:"}</em> {eyeColor}
            </div>
            }
        >
            <Card className={styles.character}>
                { name }
            </Card>
        </HtmlTooltip>
    )
}

export default Character