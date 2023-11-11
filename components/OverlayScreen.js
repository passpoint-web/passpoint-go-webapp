
const OverlayScreen = ({onClick, zIndex=false}) => {
	return (
		<div className={`overlay_screen ${zIndex ? 'z_index_overlay' : ''}`}
			onClick={onClick} />
	)
}
// TODO: styles for backdrop
// rgba(17, 17, 17, 0.2);
// backdrop-filter: blur(8px);

export default OverlayScreen
