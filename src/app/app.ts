import { TuiRoot } from '@taiga-ui/core';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TuiIcon} from '@taiga-ui/core';
import { WizardDialogComponent } from './prenotazione-assistenza/wizard-dialog';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TuiRoot, TuiIcon, WizardDialogComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly title = signal('frontend');
}
