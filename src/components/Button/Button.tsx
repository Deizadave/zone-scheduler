import localStyles from './Button.module.css';
import globalStyles from '../../App.module.css';

interface Props {
  type: "button" | "toggle" | "link";
  design?: "" | "fill" | "outline";
  color?: "primary" | "secondary" | "danger";
  label: string;
  toggleLabel?: [string, string];
  action?: () => {};
  link?: string;
}

function Button({
  type, design = '', color = 'primary', label = '', toggleLabel = ['', ''], action, link
}: Props) {
  return (
    <button className={`${localStyles.button} ${localStyles[type]} ${localStyles[design]} ${localStyles[color]}`}>
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
