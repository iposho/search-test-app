export default function calculateAge(birthdateString: string): number {
  const birthdate = new Date(birthdateString);
  const currentDate = new Date();

  let age = currentDate.getFullYear() - birthdate.getFullYear();

  if (
    currentDate.getMonth() < birthdate.getMonth()
    || (currentDate.getMonth() === birthdate.getMonth()
      && currentDate.getDate() < birthdate.getDate())
  ) {
    age -= 1;
  }

  return age;
}
