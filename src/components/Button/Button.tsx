import localStyles from './Button.module.css';
import globalStyles from '../../App.module.css';

interface Props {
  type: "button" | "toggle" | "link" | "icon";
  design?: "" | "fill" | "outline";
  color?: "primary" | "secondary" | "danger";
  label: string;
  icon?: string;
  toggleLabel?: [string, string];
  action?: () => any;
  link?: string;
  disabled?: boolean;
}

function Button({
  type, design = '', color = 'primary', label = '',
  icon, toggleLabel = ['', ''], action, link, disabled = false
}: Props) {
  let content = <>{label}</>;
  if (type === "toggle") {
    content = (
      <>
        <span className={`
          ${localStyles.toggleSlider} ${label === toggleLabel[1] ? localStyles.toggleSliderRight : ''}
          ${globalStyles.flex} ${globalStyles.flexCenter} material-icons-round
        `}>thermostat</span>
        <span>{toggleLabel[0]}</span>
        <span>{toggleLabel[1]}</span>
      </>
    )
  } else if (type === "icon") {
    content = <span className={`${localStyles.buttonIcon} material-icons-round`}>{icon}</span>
  }

  return (
    <button className={`${localStyles.button} ${localStyles[type]} ${localStyles[design]} ${localStyles[color]}`}
      onClick={action ? action : undefined} disabled={disabled}>
        {(type !== "icon" && icon) ? <span className="material-icons-round">{icon}</span> : null}
        {content}
    </button>
  );
}

export default Button;
