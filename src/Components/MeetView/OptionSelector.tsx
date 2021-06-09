import React from "react"
import { useSetRecoilState } from "recoil"
import styled from "styled-components"
import { userConfigSelector } from "../../Constant/selectors"
import { SceneOption } from "../../Constant/types"
import useScriptParser from "../../Utils/useScriptParser"

const Container = styled.div``
const OptionList = styled.ul`
  list-style: disc;
  padding-left: 20px;
`
const OptionItem = styled.li`
  font-size: 36px;
  cursor: pointer;
  font-weight: 400;
  margin: 8px 0px;
  &:hover {
    font-weight: 600;
  }
  @media (max-width: 1024px) {
    font-size: 20px;
  }
`

export interface OptionSelectorProps {
  options: SceneOption[]
  selectOption: Function
}
const OptionSelector: React.FC<OptionSelectorProps> = ({ options, selectOption }) => {
  const setUserConfig = useSetRecoilState(userConfigSelector)
  const scriptParser = useScriptParser()

  const onOptionClicked = (i: number) => (e: React.MouseEvent) => {
    const specials = scriptParser.getSpecials(options[i].answer)
    if (specials?.input) {
      let inputData = prompt("입력해주세요")
      if (!inputData || inputData?.length === 0) {
        return
      }
      setUserConfig((userConfig) => ({ ...userConfig, [specials.input]: inputData }))
      selectOption(i, { [specials.input]: inputData })
    } else selectOption(i)
    e.stopPropagation()
  }

  return (
    <Container>
      <OptionList>
        {options.map(({ answer }, i) => (
          <OptionItem key={i} onClick={onOptionClicked(i)} dangerouslySetInnerHTML={{ __html: scriptParser.getText(answer ?? "") }}></OptionItem>
        ))}
      </OptionList>
    </Container>
  )
}

export default OptionSelector
