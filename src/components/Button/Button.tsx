import localStyles from './Button.module.css';
import globalStyles from '../../App.module.css';

interface Props {
  type: "button" | "toggle" | "link";
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
  type, design = '', color = 'primary', label = '', icon, toggleLabel = ['', ''], action, link, disabled = false
}: Props) {
  return (
    <button className={`${localStyles.button} ${localStyles[type]} ${localStyles[design]} ${localStyles[color]}`}
      onClick={action ? action : undefined} disabled={disabled}>
        {icon ? <span className="material-icons-round">{icon}</span> : null}
        {type === "toggle" ?
          <>
            <span className={`
              ${localStyles.toggleSlider} ${label === toggleLabel[1] ? localStyles.toggleSliderRight : ''}
              ${globalStyles.flex} ${globalStyles.flexCenter} material-icons-round
            `}>thermostat</span>
            <span>{toggleLabel[0]}</span>
            <span>{toggleLabel[1]}</span>
          </>
          : label
        }
    </button>
  );
}

export default Button;
