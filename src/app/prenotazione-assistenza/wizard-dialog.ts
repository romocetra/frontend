import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WizardPayload } from './wizard-dialog.model';

// Taiga UI v5 Imports (Rimosso TuiAlertService)
import { 
  TuiButton, 
  TuiLabel, 
  TuiTextfield,
  TuiDropdown,
  TuiDataList,
  TuiCheckbox,
  TuiFilterByInputPipe
} from '@taiga-ui/core';
import { 
  TuiTabs,
  TuiDataListWrapper,
  TuiRadioList
} from '@taiga-ui/kit';

@Component({
  selector: 'app-wizard-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiTabs,
    TuiTextfield,
    TuiLabel,
    TuiCheckbox,
    TuiButton,
    TuiDropdown,
    TuiDataList,
    TuiDataListWrapper,
    TuiFilterByInputPipe,
    TuiRadioList
  ],
  template: `
    <div class="dialog-overlay">
      <div class="dialog-container">
        
        <header class="dialog-header">
          <h2>Nuova Registrazione</h2>
          <button class="close-btn" type="button" aria-label="Chiudi" (click)="onClose()">×</button>
        </header>

        @if (errorMessage) {
          <div class="alert-banner error-banner">
            <strong>Attenzione:</strong> {{ errorMessage }}
          </div>
        }
        @if (successMessage) {
          <div class="alert-banner success-banner">
            <strong>Successo:</strong> {{ successMessage }}
          </div>
        }

        <tui-tabs [(activeItemIndex)]="activeItemIndex" class="dialog-tabs">
          @for (step of steps; track step) {
            <button tuiTab type="button">
              {{ step }}
            </button>
          }
        </tui-tabs>

        <form [formGroup]="wizardForm" class="dialog-body" (ngSubmit)="onSave()">
          
          @if (activeItemIndex === 0) {
            <div formGroupName="step1" class="step-content">
              <h3>Informazioni Personali</h3>
              
              <label tuiLabel class="field-label">
                Nome Completo
                <tui-textfield [class.tui-parent-invalid-style]="isInvalid('step1.fullName')">
                  <input placeholder="Es. Mario Rossi" formControlName="fullName" />
                </tui-textfield>
                
                @if (isInvalid('step1.fullName')) {
                  <span class="error-text">Il nome completo è obbligatorio.</span>
                }
              </label>

              <div class="fields-grid">
                <label tuiLabel class="field-label">
                  Età
                  <tui-textfield [class.tui-parent-invalid-style]="isInvalid('step1.age')">
                    <input type="number" min="18" max="120" formControlName="age" />
                  </tui-textfield>
                  
                  @if (isInvalid('step1.age')) {
                    <span class="error-text">Devi avere almeno 18 anni.</span>
                  }
                </label>

                <label tuiLabel class="field-label">
                  Paese di Residenza
                  <tui-textfield tuiChevron>
                    <input placeholder="Scegli un paese" formControlName="country" />
                    <tui-data-list-wrapper *tuiDropdown [items]="countries | tuiFilterByInput" />
                  </tui-textfield>
                </label>
              </div>
            </div>
          }

          @if (activeItemIndex === 1) {
            <div formGroupName="step2" class="step-content">
              <h3>Preferenze di Contatto</h3>

              <label tuiLabel class="field-label">
                Come preferisci essere contattato?
                <tui-radio-list 
                  formControlName="contactMethod" 
                  [items]="contactOptions"
                  class="tui-space_top-2">
                </tui-radio-list>
              </label>

              <label tuiLabel class="field-label tui-space_top-4">
                Biografia / Note aggiuntive
                <tui-textfield [class.tui-parent-invalid-style]="isInvalid('step2.bio')">
                  <textarea placeholder="Raccontaci brevemente di te..." formControlName="bio"></textarea>
                </tui-textfield>
                @if (isInvalid('step2.bio')) {
                  <span class="error-text">La biografia è obbligatoria.</span>
                }
              </label>

              <div class="checkbox-container tui-space_top-4">
                <label tuiLabel>
                  <input tuiCheckbox type="checkbox" formControlName="acceptTerms" />
                  Accetto integralmente i termini di servizio
                </label>
              </div>
            </div>
          }

          @if (activeItemIndex === 2) {
            <div class="step-content">
              <h3>Verifica i tuoi dati</h3>
              <p class="summary-info">Di seguito trovi il payload JSON strutturato che verrà inviato al backend:</p>
              
              <pre class="summary-box">{{ wizardForm.value | json }}</pre>
            </div>
          }

          <footer class="dialog-footer">
            <button 
              tuiButton 
              type="button" 
              appearance="secondary" 
              [disabled]="activeItemIndex === 0"
              (click)="prevStep()">
              Indietro
            </button>

            <div class="footer-actions-right">
              @if (activeItemIndex < steps.length - 1) {
                <button 
                  tuiButton 
                  type="button" 
                  appearance="flat"
                  (click)="nextStep()">
                  Avanti
                </button>
              }

              <button 
                tuiButton 
                type="submit">
                Salva
              </button>
            </div>
          </footer>
        </form>

      </div>
    </div>
  `,
  styles: `
    .dialog-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      padding: 1rem;
      box-sizing: border-box;
    }

    .dialog-container {
      background: var(--tui-base-01);
      border-radius: var(--tui-radius-l);
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
      width: 100%;
      max-width: 650px;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      max-height: 90vh;
    }

    /* Stili per i Banner dei messaggi di Errore/Successo statici */
    .alert-banner {
      padding: 0.75rem 1.5rem;
      font-size: 0.9rem;
      border-bottom: 1px solid transparent;
    }
    .error-banner {
      background-color: #ffeef0;
      color: #e02424;
      border-color: #fdbdbd;
    }
    .success-banner {
      background-color: #f0fdf4;
      color: #16a34a;
      border-color: #bbf7d0;
    }

    .dialog-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.25rem 1.5rem;
      border-bottom: 1px solid var(--tui-border-normal);
      
      h2 {
        margin: 0;
        font-size: 1.25rem;
        font-weight: 600;
      }

      .close-btn {
        background: transparent;
        border: none;
        font-size: 1.75rem;
        cursor: pointer;
        color: var(--tui-text-secondary);
        transition: color 0.2s;
        &:hover { color: var(--tui-text-primary); }
      }
    }

    .dialog-tabs {
      padding: 0.5rem 1rem 0;
    }

    .dialog-body {
      padding: 1.5rem;
      overflow-y: auto;
    }

    .step-content {
      min-height: 250px;
      display: flex;
      flex-direction: column;
      gap: 1rem;

      h3 {
        margin: 0 0 0.5rem 0;
        font-size: 1.1rem;
        color: var(--tui-text-primary);
      }
    }

    .fields-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1rem;
    }

    .field-label {
      width: 100%;
    }

    .checkbox-container {
      display: flex;
      align-items: center;
    }

    .summary-info {
      font-size: 0.9rem;
      color: var(--tui-text-secondary);
    }

    .summary-box {
      background: var(--tui-base-02);
      padding: 1rem;
      border-radius: var(--tui-radius-m);
      font-family: 'Courier New', Courier, monospace;
      font-size: 0.85rem;
      overflow-x: auto;
      border: 1px solid var(--tui-border-normal);
      max-height: 180px;
    }

    .dialog-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 1.5rem;
      border-top: 1px solid var(--tui-border-normal);
      margin-top: auto;
    }

    .footer-actions-right {
      display: flex;
      gap: 0.75rem;
    }

/* Colore rosso per il testo di errore sotto i campi */
.error-text {
  display: block;
  color: var(--tui-text-negative, #f44336);
  font-size: 0.75rem;
  margin-top: 0.25rem;
  font-weight: 500;
}

/* Forza il bordo rosso sul textfield di Taiga UI v5 */
.tui-parent-invalid-style {
  --tui-border-focus: var(--tui-text-negative, #f44336) !important;
  --tui-border-normal: var(--tui-text-negative, #f44336) !important;
  box-shadow: 0 0 0 1px var(--tui-text-negative, #f44336) inset;
}

    @media (min-width: 480px) {
      .fields-grid {
        grid-template-columns: 1fr 2fr;
      }
    }

    @media (max-width: 576px) {
      .dialog-container {
        height: 100%;
        max-height: 100vh;
        border-radius: 0;
      }
      .dialog-overlay {
        padding: 0;
      }
      .step-content {
        min-height: auto;
      }
    }
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WizardDialogComponent {
  protected activeItemIndex = 0;
  protected readonly steps = ['Anagrafica', 'Preferenze', 'Riepilogo'];
  protected readonly countries = ['Italia', 'Francia', 'Germania', 'Spagna', 'Regno Unito'];
  protected readonly contactOptions = ['Email', 'Telefono', 'Nessuno'];

  // Gestione degli stati dei messaggi (Senza dipendenze da animazioni)
  protected errorMessage: string | null = null;
  protected successMessage: string | null = null;

  protected readonly wizardForm = new FormGroup({
    step1: new FormGroup({
      fullName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      country: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      age: new FormControl<number | null>(null, [Validators.required, Validators.min(18)])
    }),
    step2: new FormGroup({
      contactMethod: new FormControl('Email', { nonNullable: true }),
      bio: new FormControl('', { nonNullable: true, validators: [Validators.required]}),
      acceptTerms: new FormControl(false, { nonNullable: true, validators: [Validators.requiredTrue] })
    })
  });

  protected nextStep(): void {
    if (this.activeItemIndex < this.steps.length - 1) {
      this.activeItemIndex++;
    }
  }

  protected prevStep(): void {
    if (this.activeItemIndex > 0) {
      this.activeItemIndex--;
    }
  }

  protected onClose(): void {
    console.log('Chiusura dialog richiesta');
  }

  protected onSave(): void {
    // Resetta i messaggi di stato precedenti
    this.errorMessage = null;
    this.successMessage = null;

    if (this.wizardForm.valid) {
      const payload: WizardPayload = this.wizardForm.getRawValue() as unknown as WizardPayload;
      
      // Feedback di successo visivo statico
      this.successMessage = 'Configurazione salvata con successo!';
      console.log('Payload pronto:', payload);
    } else {
      // 1. Evidenzia visivamente i campi errati in rosso
      this.markFormGroupTouched(this.wizardForm);

      // 2. Naviga automaticamente allo step con l'errore
      this.focusFirstErrorStep();

      // 3. Mostra il banner di errore statico in cima
      this.errorMessage = 'Controlla i campi evidenziati in rosso prima di procedere.';
    }
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      control.markAsDirty();
      control.updateValueAndValidity();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  private focusFirstErrorStep(): void {
    const step1 = this.wizardForm.get('step1');
    const step2 = this.wizardForm.get('step2');

    if (step1 && step1.invalid) {
      this.activeItemIndex = 0;
    } else if (step2 && step2.invalid) {
      this.activeItemIndex = 1;
    }
  }

  /**
   * Helper per verificare se un controllo specifico è invalido e "touched"
   * Accetta il percorso del form (es. 'step1.fullName')
   */
  protected isInvalid(controlPath: string): boolean {
    const control = this.wizardForm.get(controlPath);
    return !!(control && control.invalid && (control.touched || control.dirty));
  }

}