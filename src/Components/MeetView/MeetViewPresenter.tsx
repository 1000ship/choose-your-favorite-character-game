import React from "react"
import { useRecoilValue } from "recoil"
import styled from "styled-components"
import { gameSceneSelector } from "../../Constant/selectors"
import ChatBox from "./ChatBox"

const Container = styled.div``

const BackgroundImage = styled.div<{ imageSrc: string }>`
	width: 100%;
	height: 100%;
	position: absolute;
	left: 0;
	top: 0;
	background-image: url("${({ imageSrc }) => imageSrc}");
	background-position: center;
	background-size: cover;
`

const CharacterImage = styled.div<{ imageSrc: string }>`
	width: 100%;
	height: 100%;
	position: absolute;
	left: 0;
	bottom: 0;
	background-image: url("${({ imageSrc }) => imageSrc}");
	background-position: bottom;
	background-size: contain;
	background-repeat: no-repeat;
	transform-origin: bottom center;
	transform: scale(1.1);
`

export interface MeetViewPresenterProps {
	stepFromScript: React.MouseEventHandler
	stepFromReaction: React.MouseEventHandler
	selectOption: Function
}
const MeetViewPresenter: React.FC<MeetViewPresenterProps> = ({ stepFromScript, stepFromReaction, selectOption }) => {
	const gameScene = useRecoilValue(gameSceneSelector)

	return (
		<Container onClick={gameScene.step === "script" ? stepFromScript : gameScene.step === "reaction" ? stepFromReaction : undefined}>
			{gameScene?.backgroundImagePath?.length && <BackgroundImage imageSrc={gameScene?.backgroundImagePath || ""}></BackgroundImage>}
			{gameScene?.characterImagePath?.length && <CharacterImage imageSrc={gameScene?.characterImagePath || ""}></CharacterImage>}
			<ChatBox selectOption={selectOption}></ChatBox>
		</Container>
	)
}

export default MeetViewPresenter
