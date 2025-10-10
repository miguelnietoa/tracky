import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({
  name: 'MatchPassword',
  async: false,
})
export class MatchPassword implements ValidatorConstraintInterface {
  validate(
    password: any,
    args: ValidationArguments,
  ): Promise<boolean> | boolean {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (password !== (args.object as any)[args.constraints[0]]) return false;
    return true;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  defaultMessage(args?: ValidationArguments): string {
    return 'Password y Confirmacion del password no son iguales';
  }
}
