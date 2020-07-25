import styled from 'styled-components';

export const FullContainer = styled.div`
	max-width: 100vw;
	height: 100vh;
  background: url('https://images5.alphacoders.com/387/387334.jpg');
	display: flex;
  flex-direction: column;
	justify-content: flex-start;
	align-items: center;
`

export const CardContainer = styled.div`
  min-height: auto;
	display: flex;
  background: white;
	flex-direction: column;
	width: 600px;
	border: 1px solid black;
`;

export const InfoBars = styled.div`
	display: flex;
	border-bottom: 1px solid black;
	justify-content: center;
	align-items: center;
	height: 50px;

	:last-of-type{
		border-bottom: none;
		border-top: 1px solid black;
		height: 30px;
	}
`
export const ContentContainer = styled.div`
	min-height: 100px;
	padding: 16px;
	display: flex;
  flex-direction: column;
`

export const BottomDetails = styled.div`
	display: flex;
	align-items: center;
	padding: 8px;

  :nth-of-type(n){
    flex:1;
    justify-content: flex-start;
  }
  :nth-of-type(2n){
    flex: 1;
    justify-content: flex-end;
  }
`

export const Text = styled.input`
  border: none;
  height: auto;
  outline: none;
  padding: 8px;
`

export const TextArea = styled.textarea`
  border: none;
  min-height: 50px;
  outline: none;
  padding: 8px;
`