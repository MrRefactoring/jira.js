import { z } from 'zod';
import { CustomFieldContextDefaultValueCascadingOptionSchema } from './customFieldContextDefaultValueCascadingOption';
import { CustomFieldContextDefaultValueMultipleOptionSchema } from './customFieldContextDefaultValueMultipleOption';
import { CustomFieldContextDefaultValueSingleOptionSchema } from './customFieldContextDefaultValueSingleOption';
import { CustomFieldContextSingleUserPickerDefaultsSchema } from './customFieldContextSingleUserPickerDefaults';
import { CustomFieldContextDefaultValueMultiUserPickerSchema } from './customFieldContextDefaultValueMultiUserPicker';
import { CustomFieldContextDefaultValueSingleGroupPickerSchema } from './customFieldContextDefaultValueSingleGroupPicker';
import { CustomFieldContextDefaultValueMultipleGroupPickerSchema } from './customFieldContextDefaultValueMultipleGroupPicker';
import { CustomFieldContextDefaultValueDateSchema } from './customFieldContextDefaultValueDate';
import { CustomFieldContextDefaultValueDateTimeSchema } from './customFieldContextDefaultValueDateTime';
import { CustomFieldContextDefaultValueURLSchema } from './customFieldContextDefaultValueURL';
import { CustomFieldContextDefaultValueProjectSchema } from './customFieldContextDefaultValueProject';
import { CustomFieldContextDefaultValueFloatSchema } from './customFieldContextDefaultValueFloat';
import { CustomFieldContextDefaultValueLabelsSchema } from './customFieldContextDefaultValueLabels';
import { CustomFieldContextDefaultValueTextFieldSchema } from './customFieldContextDefaultValueTextField';
import { CustomFieldContextDefaultValueTextAreaSchema } from './customFieldContextDefaultValueTextArea';
import { CustomFieldContextDefaultValueReadOnlySchema } from './customFieldContextDefaultValueReadOnly';
import { CustomFieldContextDefaultValueSingleVersionPickerSchema } from './customFieldContextDefaultValueSingleVersionPicker';
import { CustomFieldContextDefaultValueMultipleVersionPickerSchema } from './customFieldContextDefaultValueMultipleVersionPicker';
import { CustomFieldContextDefaultValueForgeStringFieldSchema } from './customFieldContextDefaultValueForgeStringField';
import { CustomFieldContextDefaultValueForgeMultiStringFieldSchema } from './customFieldContextDefaultValueForgeMultiStringField';
import { CustomFieldContextDefaultValueForgeObjectFieldSchema } from './customFieldContextDefaultValueForgeObjectField';
import { CustomFieldContextDefaultValueForgeDateTimeFieldSchema } from './customFieldContextDefaultValueForgeDateTimeField';
import { CustomFieldContextDefaultValueForgeGroupFieldSchema } from './customFieldContextDefaultValueForgeGroupField';
import { CustomFieldContextDefaultValueForgeMultiGroupFieldSchema } from './customFieldContextDefaultValueForgeMultiGroupField';
import { CustomFieldContextDefaultValueForgeNumberFieldSchema } from './customFieldContextDefaultValueForgeNumberField';
import { CustomFieldContextDefaultValueForgeUserFieldSchema } from './customFieldContextDefaultValueForgeUserField';
import { CustomFieldContextDefaultValueForgeMultiUserFieldSchema } from './customFieldContextDefaultValueForgeMultiUserField';

export const CustomFieldContextDefaultValueSchema = z.discriminatedUnion('type', [
  CustomFieldContextDefaultValueCascadingOptionSchema,
  CustomFieldContextDefaultValueMultipleOptionSchema,
  CustomFieldContextDefaultValueSingleOptionSchema,
  CustomFieldContextSingleUserPickerDefaultsSchema,
  CustomFieldContextDefaultValueMultiUserPickerSchema,
  CustomFieldContextDefaultValueSingleGroupPickerSchema,
  CustomFieldContextDefaultValueMultipleGroupPickerSchema,
  CustomFieldContextDefaultValueDateSchema,
  CustomFieldContextDefaultValueDateTimeSchema,
  CustomFieldContextDefaultValueURLSchema,
  CustomFieldContextDefaultValueProjectSchema,
  CustomFieldContextDefaultValueFloatSchema,
  CustomFieldContextDefaultValueLabelsSchema,
  CustomFieldContextDefaultValueTextFieldSchema,
  CustomFieldContextDefaultValueTextAreaSchema,
  CustomFieldContextDefaultValueReadOnlySchema,
  CustomFieldContextDefaultValueSingleVersionPickerSchema,
  CustomFieldContextDefaultValueMultipleVersionPickerSchema,
  CustomFieldContextDefaultValueForgeStringFieldSchema,
  CustomFieldContextDefaultValueForgeMultiStringFieldSchema,
  CustomFieldContextDefaultValueForgeObjectFieldSchema,
  CustomFieldContextDefaultValueForgeDateTimeFieldSchema,
  CustomFieldContextDefaultValueForgeGroupFieldSchema,
  CustomFieldContextDefaultValueForgeMultiGroupFieldSchema,
  CustomFieldContextDefaultValueForgeNumberFieldSchema,
  CustomFieldContextDefaultValueForgeUserFieldSchema,
  CustomFieldContextDefaultValueForgeMultiUserFieldSchema,
]);

export type CustomFieldContextDefaultValue = z.infer<typeof CustomFieldContextDefaultValueSchema>;
