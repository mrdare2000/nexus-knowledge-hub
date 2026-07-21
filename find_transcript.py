import json
import re

with open(r'C:\Users\user\.gemini\antigravity-ide\brain\5a7586f6-320b-4d7a-9525-e70840d5e5e2\.system_generated\logs\transcript_full.jsonl', 'r', encoding='utf-8') as f:
    for line in f:
        try:
            data = json.loads(line)
            content = data.get('content', '')
            # check tool calls
            for call in data.get('tool_calls', []):
                args = call.get('arguments', {})
                code = args.get('CodeContent', '') + args.get('ReplacementContent', '') + str(args.get('ReplacementChunks', '')) + args.get('CommandLine', '')
                if 'NEXUS_KNOWLEDGE_BASE' in code and '✈️' in code:
                    print('FOUND UNCORRUPTED EMOJIS IN TOOL CALL!')
                    print(code[:200])
                    break
        except Exception as e:
            pass
