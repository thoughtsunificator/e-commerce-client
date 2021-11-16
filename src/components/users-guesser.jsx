import React from 'react';
import { 
	ReferenceInput, 
	ReferenceField, 
	TextField, 
	AutocompleteInput,
	ArrayInput,
	SimpleFormIterator,
	TextInput,
	// AutocompleteArrayInput ,
	// SelectArrayInput,
	// ReferenceFieldController
} from "react-admin";

import { 
	ListGuesser,
	CreateGuesser,
	FieldGuesser,
	EditGuesser,
	InputGuesser,
	ShowGuesser
 } from '@api-platform/admin';


export const Edit = props => (
	<EditGuesser  {...props}>
		<InputGuesser source="username" />
		<InputGuesser source="email" />
		{/*<InputGuesser source="roles" />*/}
		{/*<AutocompleteArrayInput source="roles" choices={['main', 'coauthor']} optionText={choice => choice} />*/}
		<ArrayInput source="roles">
			<SimpleFormIterator>
				<TextInput />
			</SimpleFormIterator>
		</ArrayInput>
		<ReferenceInput
			source="customer"
			reference="customers"
			filterToQuery={searchText => ({ name: searchText })}
		>
			<AutocompleteInput optionText="name" />
		</ReferenceInput>
		<ReferenceInput
			source="merchant"
			reference="merchants"
			filterToQuery={searchText => ({ name: searchText })}
		>
			<AutocompleteInput optionText="name" />
		</ReferenceInput>
		<ReferenceInput
			source="seller"
			reference="sellers"
			filterToQuery={searchText => ({ name: searchText })}
		>
			<AutocompleteInput optionText="name" />
		</ReferenceInput>
	</EditGuesser >
);

export const Create = props => (
	<CreateGuesser {...props}>
		<InputGuesser source="username" />
		<InputGuesser source="email" type="email"/>
		<InputGuesser source="password" type="password"/>
		<InputGuesser source="roles" />
		<ReferenceInput
			source="customer"
			reference="customers"
			filterToQuery={searchText => ({ name: searchText })}
		>
			<AutocompleteInput optionText="name" />
		</ReferenceInput>
		<ReferenceInput
			source="merchant"
			reference="merchants"
			filterToQuery={searchText => ({ name: searchText })}
		>
			<AutocompleteInput optionText="name" />
		</ReferenceInput>
		<ReferenceInput
			source="seller"
			reference="sellers"
			filterToQuery={searchText => ({ name: searchText })}
		>
			<AutocompleteInput optionText="name" />
		</ReferenceInput>
	</CreateGuesser>
);

export const List = props => (
	<ListGuesser {...props}>
		<FieldGuesser source="username" />
		<FieldGuesser source="email" />
		<FieldGuesser source="roles" />
		<ReferenceField
			source="customer"
			reference="customers"
		>
			<TextField source="name" />
		</ReferenceField>
		<ReferenceField
			source="merchant"
			reference="merchants"
		>
			<TextField source="name" />
		</ReferenceField>
		<ReferenceField
			source="seller"
			reference="sellers"
		>
			<TextField source="name" />
		</ReferenceField>
	</ListGuesser>
);

export const Show = props => (
	<ShowGuesser {...props}>
		<FieldGuesser source="id" addLabel={true} />
		<FieldGuesser source="username" addLabel={true} />
		<FieldGuesser source="email" addLabel={true} />
		<FieldGuesser source="roles" addLabel={true} />
		<ReferenceField
			source="customer"
			reference="customers"
		>
			<TextField source="name" />
		</ReferenceField>
		<ReferenceField
			source="merchant"
			reference="merchants"
		>
			<TextField source="name" />
		</ReferenceField>
		<ReferenceField
			source="seller"
			reference="sellers"
		>
			<TextField source="name" />
		</ReferenceField>
	</ShowGuesser>
);