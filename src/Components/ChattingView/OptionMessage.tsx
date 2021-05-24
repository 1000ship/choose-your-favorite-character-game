import React from "react"
import { useRecoilValue, useSetRecoilState } from "recoil"
import styled from "styled-components"
import { gameSceneSelector, userConfigSelector } from "../../Constant/selectors"
import { SceneOption } from "../../Constant/types"
import useScriptParser from "../../Utils/useScriptParser"

const RightMessage = styled.span`
  align-self: flex-end;
  margin: 15px;
  padding: 12px;
  border: 3px solid #a21ccb;
  border-radius: 15px 15px 3px 15px;
  border-image-slice: 1;
  color: #662d91;
  @media (min-width: 768px) {
    font-size: 2em;
  }
`

const OptionList = styled.ul``
const OptionItem = styled.li`
  cursor: pointer;
  &:hover {
    font-weight: 600;
  }
`

export interface OptionMessageProps {
  selectOption: Function
  options?: SceneOption[]
}
const OptionMessage: React.FC<OptionMessageProps> = ({ selectOption, options: propsOptions }) => {
  const gameScene = useRecoilValue(gameSceneSelector)
  const setUserConfig = useSetRecoilState(userConfigSelector)
  const scriptParser = useScriptParser()
  const options = propsOptions ? propsOptions : gameScene.options

  const onOptionClick = (i: number) => (e: React.MouseEvent) => {
    const specials = scriptParser.getSpecials(options[i]?.answer)
    if (specials?.input) {
      let inputData = prompt("입력해주세요")
      if (!inputData || inputData?.length === 0) {
        return
      }
      setUserConfig((userConfig) => ({ ...userConfig, [specials.input]: inputData }))
      selectOption(i, { [specials.input]: inputData })
    } else selectOption(i)
  }

  return (
    <RightMessage>
      <OptionList>
        {options.map((option, i) => (
          <OptionItem
            key={i}
            onClick={onOptionClick(i)}
            dangerouslySetInnerHTML={{
              __html: scriptParser.getText(option?.answer ?? ""),
            }}
          ></OptionItem>
        ))}
      </OptionList>
    </RightMessage>
  )
}

export default OptionMessage
