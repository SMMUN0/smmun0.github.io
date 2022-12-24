#include <iostream>
#include <string>
#include <fstream>
#include <list>
#include <cstring>
#include <sys/stat.h>


std::string year;
bool JSON, COMMITES;
std::list<std::string> committee_names;

int main(int argc, char *argv[]){
    
    // Get year to be generated
    if(argc > 1) year = argv[1];
    else{
        std::cout << "Introduce el año del cual quieres generar: ";
        std::cin >> year;
    }

    // Get which files to generate
    std::cout << "¿Deseas generar " << year << ".json?(true/false): ";
    std::cin >> std::boolalpha >> JSON;
    std::cout << "¿Deseas generar las carpetas de los comites del año " << year << "?(true/false): ";
    std::cin >> std::boolalpha >> COMMITES;

    std::cout << "Vas a generar:" << std::endl << (JSON?"- " + year + ".json\n":"") << (COMMITES?"- Carpetas de comités\n":"") << std::endl;

    // Get committees names from ./committees/year/committees.txt
    {
        std::ifstream committee_name_file;
        committee_name_file.open("./committees/" + year + "/committees.txt");
        std::string committee_name;
        while(getline(committee_name_file, committee_name))
            committee_names.push_back(committee_name);
        committee_name_file.close();
    }

    // Generate JSON
    if(JSON){
        std::ofstream json_committees_file;
        json_committees_file.open("./committees/" + year + "/" + year + ".json");
        json_committees_file << '[' << std::endl;

        // Outputs every committee with its respective properties
        for(auto committee_name: committee_names){
            json_committees_file <<  '\t' << '{' << std::endl;
            json_committees_file <<  "\t\t" << "\"CODE\":\"" + committee_name + "\"," << std::endl;
            json_committees_file <<  "\t\t" << "\"NAME\":\"nombre_mesa\"," << std::endl;
            json_committees_file <<  "\t\t" << "\"LAN\":\"idioma_mesa\"," << std::endl;
            json_committees_file <<  "\t\t" << "\"INFO\":\"info_mesa\"," << std::endl;
            json_committees_file <<  "\t\t" << "\"TOPICS\":" << std::endl;
            json_committees_file <<  "\t\t" << '{' << std::endl;
            json_committees_file <<  "\t\t\t" << "\"A\":\"topico_a\"," << std::endl;
            json_committees_file <<  "\t\t\t" << "\"B\":\"topico_c\"" << std::endl;
            json_committees_file <<  "\t\t" << '}' << ',' << std::endl;
            json_committees_file <<  "\t\t" << "\"CHAIR\":" << std::endl;
            json_committees_file <<  "\t\t" << '{' << std::endl;
            json_committees_file <<  "\t\t\t" << "\"PRES\":\"nombre_presidencia\"," << std::endl;
            json_committees_file <<  "\t\t\t" << "\"MOD\":\"nombre_moderacion\"," << std::endl;
            json_committees_file <<  "\t\t\t" << "\"OFI\":\"nombre_oficialia\"" << std::endl;
            json_committees_file <<  "\t\t" << '}' << std::endl;
            json_committees_file <<  '\t' << '}' << (committee_name==committee_names.back()?"":",") << std::endl;
        }
        json_committees_file << ']' << std::endl;
        json_committees_file.close();
    }

    // Generate committees folders
    if(COMMITES){
        std::string first, second, *temp = &first;
        {
            std::string in;
            std::ifstream template_in;
            template_in.open("template.html");
            while(!template_in.eof()){
                getline(template_in, in);

                if(in == "<!-- onload function -->"){
                    temp = &second;
                    continue;
                }
                *temp += in;
                (*temp).push_back('\n');
            }
            template_in.close();
        }

        for(auto committee_name: committee_names){
            std::string path = "./committees/" + year + "/" + committee_name;
            std::cout << path << std::endl;
            
            std::ofstream committee_files;
            committee_files.open("./committees/" + year + "/" + committee_name + "/" + committee_name + ".html");
            committee_files << first;
            committee_files << "<body onload='load(\"" << committee_name << "\"," << year << ")'>" << std::endl;
            committee_files << second;
            committee_files.close();
        }
    }
    


}