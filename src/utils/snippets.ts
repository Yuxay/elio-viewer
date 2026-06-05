// ---------------------------------------------------------------------------
// 代码片段（Snippets）— 各语言的快捷模板
// CodeMirror 6 snippet 语法：
//   $1, $2 …  Tab 跳转位
//   ${1:label}  带占位文字的跳转位
//   $name       命名字段
// ---------------------------------------------------------------------------

interface SnippetDef {
  /** 触发关键字 */
  keyword: string
  /** 在补全列表中显示的标签 */
  label: string
  /** 详细描述 */
  detail: string
  /** snippet 模板 */
  template: string
}

// =========================================================================
// JavaScript / TypeScript / JSX / TSX 通用 snippets
// =========================================================================
const jsTsSnippets: SnippetDef[] = [
  {
    keyword: 'for',
    label: 'for',
    detail: 'for 循环',
    template: 'for (let ${1:i} = 0; ${1:i} < ${2:length}; ${1:i}++) {\n  ${3:}\n}'
  },
  {
    keyword: 'forin',
    label: 'for...in',
    detail: 'for...in 循环',
    template: 'for (const ${1:key} in ${2:object}) {\n  ${3:}\n}'
  },
  {
    keyword: 'forof',
    label: 'for...of',
    detail: 'for...of 循环',
    template: 'for (const ${1:item} of ${2:iterable}) {\n  ${3:}\n}'
  },
  {
    keyword: 'foreach',
    label: 'forEach',
    detail: 'Array.forEach 循环',
    template: '${1:array}.forEach((${2:item}) => {\n  ${3:}\n})'
  },
  {
    keyword: 'if',
    label: 'if',
    detail: 'if 语句',
    template: 'if (${1:condition}) {\n  ${2:}\n}'
  },
  {
    keyword: 'ife',
    label: 'if...else',
    detail: 'if...else 语句',
    template: 'if (${1:condition}) {\n  ${2:}\n} else {\n  ${3:}\n}'
  },
  {
    keyword: 'elseif',
    label: 'else if',
    detail: 'else if 语句',
    template: 'else if (${1:condition}) {\n  ${2:}\n}'
  },
  {
    keyword: 'switch',
    label: 'switch',
    detail: 'switch 语句',
    template: 'switch (${1:key}) {\n  case ${2:value}:\n    ${3:}\n    break\n  default:\n    break\n}'
  },
  {
    keyword: 'try',
    label: 'try...catch',
    detail: 'try...catch 异常处理',
    template: 'try {\n  ${1:}\n} catch (${2:error}) {\n  ${3:}\n}'
  },
  {
    keyword: 'tryf',
    label: 'try...finally',
    detail: 'try...finally 异常处理',
    template: 'try {\n  ${1:}\n} catch (${2:error}) {\n  ${3:}\n} finally {\n  ${4:}\n}'
  },
  {
    keyword: 'wh',
    label: 'while',
    detail: 'while 循环',
    template: 'while (${1:condition}) {\n  ${2:}\n}'
  },
  {
    keyword: 'dow',
    label: 'do...while',
    detail: 'do...while 循环',
    template: 'do {\n  ${1:}\n} while (${2:condition})'
  },
  {
    keyword: 'fn',
    label: 'function',
    detail: '函数声明',
    template: 'function ${1:name}(${2:params}) {\n  ${3:}\n}'
  },
  {
    keyword: 'afn',
    label: 'arrow function',
    detail: '箭头函数',
    template: 'const ${1:name} = (${2:params}) => {\n  ${3:}\n}'
  },
  {
    keyword: 'cl',
    label: 'class',
    detail: 'class 类定义',
    template: 'class ${1:ClassName} {\n  constructor(${2:params}) {\n    ${3:}\n  }\n}'
  },
  {
    keyword: 'im',
    label: 'import',
    detail: 'import 语句',
    template: 'import { ${1:} } from \'${2:module}\''
  },
  {
    keyword: 'imd',
    label: 'import default',
    detail: 'import default 语句',
    template: 'import ${1:Name} from \'${2:module}\''
  },
  {
    keyword: 'ex',
    label: 'export',
    detail: 'export 语句',
    template: 'export { ${1:} }'
  },
  {
    keyword: 'clg',
    label: 'console.log',
    detail: '控制台日志',
    template: 'console.log(\'${1:}\', ${1:})'
  },
  {
    keyword: 'ret',
    label: 'return',
    detail: 'return 语句',
    template: 'return ${1:}'
  }
]

// =========================================================================
// Python
// =========================================================================
const pythonSnippets: SnippetDef[] = [
  {
    keyword: 'for',
    label: 'for',
    detail: 'for 循环',
    template: 'for ${1:item} in ${2:iterable}:\n  ${3:}'
  },
  {
    keyword: 'forr',
    label: 'for range',
    detail: 'for...range 循环',
    template: 'for ${1:i} in range(${2:10}):\n  ${3:}'
  },
  {
    keyword: 'if',
    label: 'if',
    detail: 'if 语句',
    template: 'if ${1:condition}:\n  ${2:}'
  },
  {
    keyword: 'ife',
    label: 'if...else',
    detail: 'if...else 语句',
    template: 'if ${1:condition}:\n  ${2:}\nelse:\n  ${3:}'
  },
  {
    keyword: 'elif',
    label: 'elif',
    detail: 'elif 语句',
    template: 'elif ${1:condition}:\n  ${2:}'
  },
  {
    keyword: 'try',
    label: 'try...except',
    detail: 'try...except 异常处理',
    template: 'try:\n  ${1:}\nexcept ${2:Exception} as ${3:e}:\n  ${4:}'
  },
  {
    keyword: 'tryf',
    label: 'try...finally',
    detail: 'try...except...finally',
    template: 'try:\n  ${1:}\nexcept ${2:Exception} as ${3:e}:\n  ${4:}\nfinally:\n  ${5:}'
  },
  {
    keyword: 'wh',
    label: 'while',
    detail: 'while 循环',
    template: 'while ${1:condition}:\n  ${2:}'
  },
  {
    keyword: 'def',
    label: 'def',
    detail: '函数定义',
    template: 'def ${1:name}(${2:params}):\n  """${3:docstring}"""\n  ${4:}'
  },
  {
    keyword: 'cl',
    label: 'class',
    detail: 'class 类定义',
    template: 'class ${1:ClassName}${2:(${3:Parent})}:\n  def __init__(self${4:, *args}):\n    ${5:}'
  },
  {
    keyword: 'imp',
    label: 'import',
    detail: 'import 语句',
    template: 'import ${1:module}'
  },
  {
    keyword: 'from',
    label: 'from...import',
    detail: 'from...import 语句',
    template: 'from ${1:module} import ${2:name}'
  },
  {
    keyword: 'pr',
    label: 'print',
    detail: 'print 输出',
    template: 'print(${1:})'
  },
  {
    keyword: 'ret',
    label: 'return',
    detail: 'return 语句',
    template: 'return ${1:}'
  }
]

// =========================================================================
// Java
// =========================================================================
const javaSnippets: SnippetDef[] = [
  {
    keyword: 'for',
    label: 'for',
    detail: 'for 循环',
    template: 'for (int ${1:i} = 0; ${1:i} < ${2:n}; ${1:i}++) {\n  ${3:}\n}'
  },
  {
    keyword: 'fore',
    label: 'for-each',
    detail: '增强 for 循环',
    template: 'for (${1:Type} ${2:item} : ${3:collection}) {\n  ${4:}\n}'
  },
  {
    keyword: 'if',
    label: 'if',
    detail: 'if 语句',
    template: 'if (${1:condition}) {\n  ${2:}\n}'
  },
  {
    keyword: 'ife',
    label: 'if...else',
    detail: 'if...else 语句',
    template: 'if (${1:condition}) {\n  ${2:}\n} else {\n  ${3:}\n}'
  },
  {
    keyword: 'switch',
    label: 'switch',
    detail: 'switch 语句',
    template: 'switch (${1:key}) {\n  case ${2:value}:\n    ${3:}\n    break;\n  default:\n    break;\n}'
  },
  {
    keyword: 'try',
    label: 'try...catch',
    detail: 'try...catch 异常处理',
    template: 'try {\n  ${1:}\n} catch (${2:Exception} ${3:e}) {\n  ${4:}\n}'
  },
  {
    keyword: 'tryf',
    label: 'try...finally',
    detail: 'try...catch...finally',
    template: 'try {\n  ${1:}\n} catch (${2:Exception} ${3:e}) {\n  ${4:}\n} finally {\n  ${5:}\n}'
  },
  {
    keyword: 'wh',
    label: 'while',
    detail: 'while 循环',
    template: 'while (${1:condition}) {\n  ${2:}\n}'
  },
  {
    keyword: 'cl',
    label: 'class',
    detail: 'class 类定义',
    template: 'public class ${1:ClassName} {\n  public static void main(String[] args) {\n    ${2:}\n  }\n}'
  },
  {
    keyword: 'sout',
    label: 'System.out.println',
    detail: '打印输出',
    template: 'System.out.println(${1:})'
  },
  {
    keyword: 'soutf',
    label: 'System.out.printf',
    detail: '格式化打印',
    template: 'System.out.printf("${1:%s}\\n", ${2:})'
  },
  {
    keyword: 'psvm',
    label: 'main',
    detail: 'main 方法',
    template: 'public static void main(String[] args) {\n  ${1:}\n}'
  }
]

// =========================================================================
// C / C++ / C#
// =========================================================================
const cppSnippets: SnippetDef[] = [
  {
    keyword: 'for',
    label: 'for',
    detail: 'for 循环',
    template: 'for (int ${1:i} = 0; ${1:i} < ${2:n}; ${1:i}++) {\n  ${3:}\n}'
  },
  {
    keyword: 'if',
    label: 'if',
    detail: 'if 语句',
    template: 'if (${1:condition}) {\n  ${2:}\n}'
  },
  {
    keyword: 'ife',
    label: 'if...else',
    detail: 'if...else 语句',
    template: 'if (${1:condition}) {\n  ${2:}\n} else {\n  ${3:}\n}'
  },
  {
    keyword: 'switch',
    label: 'switch',
    detail: 'switch 语句',
    template: 'switch (${1:expr}) {\n  case ${2:value}:\n    ${3:}\n    break;\n  default:\n    break;\n}'
  },
  {
    keyword: 'try',
    label: 'try...catch',
    detail: 'try...catch 异常处理',
    template: 'try {\n  ${1:}\n} catch (${2:std::exception}& ${3:e}) {\n  ${4:}\n}'
  },
  {
    keyword: 'wh',
    label: 'while',
    detail: 'while 循环',
    template: 'while (${1:condition}) {\n  ${2:}\n}'
  },
  {
    keyword: 'fn',
    label: 'function',
    detail: '函数定义',
    template: '${1:int} ${2:name}(${3:params}) {\n  ${4:}\n  return ${5:0};\n}'
  },
  {
    keyword: 'cl',
    label: 'class',
    detail: 'class 类定义',
    template: 'class ${1:ClassName} {\npublic:\n  ${2:}\nprivate:\n  ${3:}\n}'
  },
  {
    keyword: 'inc',
    label: '#include',
    detail: 'include 指令',
    template: '#include <${1:}>'
  },
  {
    keyword: 'main',
    label: 'main',
    detail: 'main 函数',
    template: 'int main() {\n  ${1:}\n  return 0;\n}'
  },
  {
    keyword: 'cout',
    label: 'cout',
    detail: '标准输出',
    template: 'std::cout << ${1:} << std::endl'
  }
]

// =========================================================================
// HTML / Vue
// =========================================================================
const htmlSnippets: SnippetDef[] = [
  {
    keyword: 'div',
    label: '<div>',
    detail: 'div 元素',
    template: '<div${1: class="${2:}"}>\n  ${3:}\n</div>'
  },
  {
    keyword: 'span',
    label: '<span>',
    detail: 'span 元素',
    template: '<span${1: class="${2:}"}>${3:}</span>'
  },
  {
    keyword: 'a',
    label: '<a>',
    detail: '链接元素',
    template: '<a href="${1:#}">${2:}</a>'
  },
  {
    keyword: 'img',
    label: '<img>',
    detail: '图像元素',
    template: '<img src="${1:}" alt="${2:}" />'
  },
  {
    keyword: 'ul',
    label: '<ul>',
    detail: '无序列表',
    template: '<ul>\n  <li>${1:}</li>\n</ul>'
  },
  {
    keyword: 'ol',
    label: '<ol>',
    detail: '有序列表',
    template: '<ol>\n  <li>${1:}</li>\n</ol>'
  },
  {
    keyword: 'table',
    label: '<table>',
    detail: '表格',
    template: '<table>\n  <thead>\n    <tr>\n      <th>${1:}</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td>${2:}</td>\n    </tr>\n  </tbody>\n</table>'
  },
  {
    keyword: 'form',
    label: '<form>',
    detail: '表单',
    template: '<form action="${1:}" method="${2:post}">\n  ${3:}\n</form>'
  },
  {
    keyword: 'input',
    label: '<input>',
    detail: '输入框',
    template: '<input type="${1:text}" placeholder="${2:}" />'
  },
  {
    keyword: 'btn',
    label: '<button>',
    detail: '按钮',
    template: '<button type="${1:button}"${2: class="${3:}"}>${4:}</button>'
  },
  {
    keyword: 'scr',
    label: '<script>',
    detail: 'script 标签',
    template: '<script${1: src="${2:}"}>\n  ${3:}\n</script>'
  },
  {
    keyword: 'sty',
    label: '<style>',
    detail: 'style 标签',
    template: '<style>\n  ${1:}\n</style>'
  },
  {
    keyword: 'vfor',
    label: 'v-for',
    detail: 'Vue v-for',
    template: 'v-for="${1:item} in ${2:list}" :key="${1:item}.id"'
  },
  {
    keyword: 'vif',
    label: 'v-if',
    detail: 'Vue v-if',
    template: 'v-if="${1:condition}"'
  },
  {
    keyword: 'von',
    label: 'v-on / @',
    detail: 'Vue 事件绑定',
    template: '@${1:click}="${2:handler}"'
  }
]

// =========================================================================
// CSS / SCSS
// =========================================================================
const cssSnippets: SnippetDef[] = [
  {
    keyword: 'flex',
    label: 'display: flex',
    detail: 'Flex 布局',
    template: 'display: flex;\njustify-content: ${1:center};\nalign-items: ${2:center};'
  },
  {
    keyword: 'grid',
    label: 'display: grid',
    detail: 'Grid 布局',
    template: 'display: grid;\ngrid-template-columns: ${1:repeat(auto-fit, minmax(200px, 1fr))};\ngap: ${2:1rem};'
  },
  {
    keyword: 'm',
    label: 'margin',
    detail: '外边距',
    template: 'margin: ${1:0};'
  },
  {
    keyword: 'p',
    label: 'padding',
    detail: '内边距',
    template: 'padding: ${1:0};'
  },
  {
    keyword: 'bg',
    label: 'background',
    detail: '背景',
    template: 'background: ${1:#fff};'
  },
  {
    keyword: 'bd',
    label: 'border',
    detail: '边框',
    template: 'border: ${1:1px solid #ccc};'
  },
  {
    keyword: 'br',
    label: 'border-radius',
    detail: '圆角',
    template: 'border-radius: ${1:8px};'
  },
  {
    keyword: 'pos',
    label: 'position',
    detail: '定位',
    template: 'position: ${1:relative};\ntop: ${2:0};\nleft: ${3:0};'
  },
  {
    keyword: 'trans',
    label: 'transition',
    detail: '过渡动画',
    template: 'transition: ${1:all} ${2:0.3s} ease;'
  },
  {
    keyword: 'mq',
    label: '@media',
    detail: '媒体查询',
    template: '@media (${1:max-width}: ${2:768px}) {\n  ${3:}\n}'
  }
]

// =========================================================================
// SQL
// =========================================================================
const sqlSnippets: SnippetDef[] = [
  {
    keyword: 'sel',
    label: 'SELECT',
    detail: 'SELECT 查询',
    template: 'SELECT ${1:*}\nFROM ${2:table}\nWHERE ${3:condition}'
  },
  {
    keyword: 'selj',
    label: 'SELECT...JOIN',
    detail: 'SELECT 联表查询',
    template: 'SELECT ${1:*}\nFROM ${2:table1}\nINNER JOIN ${3:table2} ON ${2:table1}.${4:id} = ${3:table2}.${4:id}\nWHERE ${5:condition}'
  },
  {
    keyword: 'ins',
    label: 'INSERT',
    detail: 'INSERT 插入',
    template: 'INSERT INTO ${1:table} (${2:columns})\nVALUES (${3:values})'
  },
  {
    keyword: 'upd',
    label: 'UPDATE',
    detail: 'UPDATE 更新',
    template: 'UPDATE ${1:table}\nSET ${2:column} = ${3:value}\nWHERE ${4:condition}'
  },
  {
    keyword: 'del',
    label: 'DELETE',
    detail: 'DELETE 删除',
    template: 'DELETE FROM ${1:table}\nWHERE ${2:condition}'
  },
  {
    keyword: 'crt',
    label: 'CREATE TABLE',
    detail: 'CREATE TABLE 建表',
    template: 'CREATE TABLE ${1:name} (\n  ${2:id} INTEGER PRIMARY KEY${3:,}\n  ${4:}\n)'
  },
  {
    keyword: 'cnt',
    label: 'COUNT',
    detail: 'COUNT 聚合',
    template: 'SELECT COUNT(${1:*})\nFROM ${2:table}\nWHERE ${3:condition}'
  },
  {
    keyword: 'ord',
    label: 'ORDER BY',
    detail: '排序',
    template: 'ORDER BY ${1:column} ${2:ASC}'
  },
  {
    keyword: 'grp',
    label: 'GROUP BY',
    detail: '分组',
    template: 'GROUP BY ${1:column}\nHAVING ${2:condition}'
  }
]

// =========================================================================
// Shell
// =========================================================================
const shellSnippets: SnippetDef[] = [
  {
    keyword: 'for',
    label: 'for',
    detail: 'for 循环',
    template: 'for ${1:var} in ${2:list}; do\n  ${3:}\ndone'
  },
  {
    keyword: 'if',
    label: 'if',
    detail: 'if 条件',
    template: 'if [ ${1:condition} ]; then\n  ${2:}\nfi'
  },
  {
    keyword: 'ife',
    label: 'if...else',
    detail: 'if...else 条件',
    template: 'if [ ${1:condition} ]; then\n  ${2:}\nelse\n  ${3:}\nfi'
  },
  {
    keyword: 'wh',
    label: 'while',
    detail: 'while 循环',
    template: 'while [ ${1:condition} ]; do\n  ${2:}\ndone'
  },
  {
    keyword: 'fn',
    label: 'function',
    detail: '函数定义',
    template: '${1:name}() {\n  ${2:}\n}'
  },
  {
    keyword: 'case',
    label: 'case',
    detail: 'case 选择',
    template: 'case ${1:var} in\n  ${2:pattern})\n    ${3:}\n    ;;\n  *)\n    ;;\nesac'
  },
  {
    keyword: 'echo',
    label: 'echo',
    detail: 'echo 输出',
    template: 'echo "${1:}"'
  }
]

// =========================================================================
// 语言 → snippet 列表映射
// =========================================================================
const SNIPPET_MAP: Record<string, SnippetDef[]> = {
  javascript: jsTsSnippets,
  js: jsTsSnippets,
  typescript: jsTsSnippets,
  ts: jsTsSnippets,
  jsx: jsTsSnippets,
  tsx: jsTsSnippets,
  python: pythonSnippets,
  py: pythonSnippets,
  java: javaSnippets,
  cpp: cppSnippets,
  c: cppSnippets,
  cs: cppSnippets,
  html: htmlSnippets,
  vue: htmlSnippets,
  css: cssSnippets,
  scss: cssSnippets,
  sql: sqlSnippets,
  sh: shellSnippets,
  bash: shellSnippets
}

// =========================================================================
// 导出
// =========================================================================

/** 根据语言扩展名获取 snippet 列表 */
export function getSnippets(fileType: string): SnippetDef[] {
  return SNIPPET_MAP[fileType] || []
}

export type { SnippetDef }
