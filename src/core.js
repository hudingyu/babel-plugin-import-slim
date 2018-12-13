import assert from 'assert';

function camel2Underline (_str) {
	const str = _str[0].toLowerCase() + _str.substr(1);
	return str.replace(/([A-Z])/g, $1 => `_${$1.toLowerCase()}`);
}

function camel2Dash(_str) {
	const str = _str[0].toLowerCase() + _str.substr(1);
	return str.replace(/([A-Z])/g, ($1) => `-${$1.toLowerCase()}`);
}

export default function core () {
	return ({ types }) => ({
		visitor: {
			ImportDeclaration (path, { opts }) {
				const specifiers = path.node.specifiers;
				const source = path.node.source;

				if (Array.isArray(opts)) {
					opts.forEach(opt => {
						assert(opt.libraryName, 'libraryName should be provided');
					});
					if (!opts.find(opt => opt.libraryName === source.value)) return;
				} else {
					assert(opts.libraryName, 'libraryName should be provided');
					if (opts.libraryName !== source.value) return;
				}

				const opt = Array.isArray(opts) ? opts.find(opt => opt.libraryName === source.value) : opts;
				opt.camel2UnderlineComponentName = typeof opt.camel2UnderlineComponentName === 'undefined'
					? false
					: opt.camel2UnderlineComponentName;
				opt.camel2DashComponentName = typeof opt.camel2DashComponentName === 'undefined'
					? false
					: opt.camel2DashComponentName;

				if (!types.isImportDefaultSpecifier(specifiers[0]) && !types.isImportNamespaceSpecifier(specifiers[0])) {
					const declarations = specifiers.map((specifier) => {
						const transformedSourceName = opt.camel2UnderlineComponentName
							? camel2Underline(specifier.imported.name)
							: opt.camel2DashComponentName
								? camel2Dash(specifier.imported.name)
								: specifier.imported.name;
						return types.ImportDeclaration([types.ImportDefaultSpecifier(specifier.local)],
							types.StringLiteral(opt.customSourceFunc(transformedSourceName)));
					});
					path.replaceWithMultiple(declarations);
				}
			}
		}
	});
}
